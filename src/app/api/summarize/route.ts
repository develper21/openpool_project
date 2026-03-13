import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// ── Zod Schema ──
const SummarizeInput = z
  .object({
    pmid: z
      .string()
      .regex(/^\d+$/, "PMID must be a numeric string")
      .optional(),
    pdfText: z
      .string()
      .min(100, "PDF text must be at least 100 characters")
      .optional(),
  })
  .refine((data) => data.pmid || data.pdfText, {
    message: "Either pmid or pdfText must be provided",
  });

// ── Gemini client (free tier) ──
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const SYSTEM_PROMPT = `You are a scientific literature analyst for pharmaceutical researchers.
Analyze the provided research paper text and return ONLY a valid JSON 
object with exactly these keys — no markdown, no extra text, just JSON:
{
  "keyFindings": "string (2-3 sentences, most important discoveries)",
  "methodology": "string (how the study was conducted)",
  "conclusions": "string (what the authors concluded)",
  "limitations": "string (study limitations or gaps)",
  "paperTitle": "string",
  "year": "string"
}`;

// ── Helpers ──
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "is");
  const match = xml.match(regex);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}

function extractAuthors(xml: string): string[] {
  const authorBlocks = xml.match(/<Author[^>]*>.*?<\/Author>/gis) || [];
  return authorBlocks
    .map((block) => {
      const last = extractTag(block, "LastName");
      const first = extractTag(block, "ForeName");
      return `${first} ${last}`.trim();
    })
    .filter(Boolean);
}

function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

// ── Gemini call with auto-retry on 429 ──
async function callGeminiWithRetry(
  prompt: string,
  systemInstruction: string = SYSTEM_PROMPT,
  maxRetries = 3
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
  });

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      // Extract retry delay from Gemini 429 errors
      const delayMatch = msg.match(/retryDelay.*?([0-9.]+)s/);
      const retryDelay = delayMatch ? Math.ceil(parseFloat(delayMatch[1])) : 30;

      if (attempt < maxRetries && msg.includes("429")) {
        const waitTime = Math.min(retryDelay + 2, 65); // cap at 65s
        console.log(
          `[Gemini] Rate limited (attempt ${attempt + 1}/${maxRetries + 1}), waiting ${waitTime}s...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
        continue;
      }

      throw new Error(`Gemini API error after ${attempt + 1} attempts: ${msg.substring(0, 200)}`);
    }
  }

  throw new Error("Gemini: max retries exceeded");
}

export async function POST(req: Request): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    // ── 0. Parse & validate input ──
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = SummarizeInput.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { pmid, pdfText } = parsed.data;

    // ── 1. Check Redis cache ──
    if (pmid) {
      try {
        const cached = await redis.get(`summary:pmid:${pmid}`);
        if (cached) {
          return NextResponse.json(JSON.parse(cached));
        }
      } catch {
        // non-fatal
      }
    }

    // ── 2. Resolve paper text ──
    let textToSummarize = "";
    let paperTitle = "Uploaded Document";
    let paperYear = new Date().getFullYear().toString();
    let authors: string[] = [];
    let abstractText = "";

    if (pmid) {
      let paperData: {
        title: string;
        abstract: string;
        year: string;
        authors: string[];
      } | null = null;

      try {
        const cachedPaper = await redis.get(`paper:pmid:${pmid}`);
        if (cachedPaper) paperData = JSON.parse(cachedPaper);
      } catch {
        // non-fatal
      }

      if (!paperData) {
        const apiKey = process.env.NCBI_API_KEY
          ? `&api_key=${process.env.NCBI_API_KEY}`
          : "";
        const pubmedUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml${apiKey}`;

        const response = await fetch(pubmedUrl);
        if (!response.ok) {
          return NextResponse.json(
            { error: `PubMed API error: ${response.status} ${response.statusText}` },
            { status: 502 }
          );
        }

        const xmlText = await response.text();
        paperData = {
          title: extractTag(xmlText, "ArticleTitle"),
          abstract: extractTag(xmlText, "AbstractText"),
          year: extractTag(xmlText, "Year") || extractTag(xmlText, "PubDate").substring(0, 4),
          authors: extractAuthors(xmlText),
        };

        try {
          await redis.set(`paper:pmid:${pmid}`, JSON.stringify(paperData), "EX", 86400 * 7);
        } catch { /* non-fatal */ }
      }

      if (!paperData.abstract) {
        return NextResponse.json(
          { error: "Abstract not found for this PMID." },
          { status: 404 }
        );
      }

      paperTitle = paperData.title;
      paperYear = paperData.year;
      authors = paperData.authors;
      abstractText = paperData.abstract;
      textToSummarize = `Title: ${paperData.title}\n\nAbstract:\n${paperData.abstract}`;
    } else if (pdfText) {
      textToSummarize = pdfText;
      abstractText = pdfText.substring(0, 2000);
    }

    // ── 2.5 Retrieve Past Feedback to Improve Accuracy ──
    let dynamicSystemPrompt = SYSTEM_PROMPT;
    try {
      // Find recent critical feedback where users left comments
      const pastFeedbacks = await prisma.feedback.findMany({
        where: { comment: { not: null }, overallRating: { lte: 3 } },
        take: 3,
        orderBy: { createdAt: "desc" },
      });

      if (pastFeedbacks.length > 0) {
        const critiques = pastFeedbacks.map((f) => `- ${f.comment}`).join("\n");
        dynamicSystemPrompt += `\n\nCRITICAL INSTRUCTIONS BASED ON PAST SYSTEM FAILURES (Avoid these mistakes):\n${critiques}\nAdapt your analysis to ensure these specific issues are not repeated.`;
      }
    } catch {
      // non-fatal
    }

    // ── 3. Call Gemini (with auto-retry on rate limit) ──
    const rawText = await callGeminiWithRetry(
      `Analyze this research paper and return the JSON summary:\n\n${textToSummarize.substring(0, 30000)}`,
      dynamicSystemPrompt
    );

    const cleanedText = stripMarkdownFences(rawText);

    let resultJson: {
      keyFindings: string;
      methodology: string;
      conclusions: string;
      limitations: string;
      paperTitle: string;
      year: string;
    };

    try {
      resultJson = JSON.parse(cleanedText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON", raw: cleanedText },
        { status: 502 }
      );
    }

    if (pmid) {
      resultJson.paperTitle = paperTitle;
      resultJson.year = paperYear;
    }

    const processingTimeMs = Date.now() - startTime;
    const finalData: any = { ...resultJson, processingTimeMs };

    // ── 4. Persist to NeonDB via Prisma ──
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session as any)?.user?.id;

    let resolvedUserId = userId;
    if (!resolvedUserId) {
      const fallbackUser = await prisma.user.findFirst({ where: { role: "RESEARCHER" } });
      resolvedUserId = fallbackUser?.id;
    }

    if (resolvedUserId) {
      const paper = await prisma.paper.upsert({
        where: { pubmedId: pmid || `pdf-${Date.now()}` },
        update: {},
        create: {
          pubmedId: pmid || null,
          title: resultJson.paperTitle || paperTitle,
          authors,
          abstract: abstractText.substring(0, 5000),
          sourceType: pmid ? "PUBMED" : "PDF",
        },
      });

      const createdSummary = await prisma.summary.create({
        data: {
          paperId: paper.id,
          userId: resolvedUserId,
          keyFindings: [resultJson.keyFindings],
          methodology: [resultJson.methodology],
          conclusions: [resultJson.conclusions],
          backgroundContext: `Paper: ${resultJson.paperTitle} (${resultJson.year})`,
          limitations: [resultJson.limitations],
          futureDirections: [],
          tags: pmid ? ["PubMed", `PMID:${pmid}`] : ["PDF Upload"],
          model: "gemini-2.5-flash",
          processingTimeMs,
          status: "COMPLETED",
        },
      });
      
      // Inject the summary id so the frontend can use it to submit feedback
      finalData.id = createdSummary.id;
    }

    // ── 5. Cache in Redis ──
    if (pmid) {
      try {
        await redis.set(`summary:pmid:${pmid}`, JSON.stringify(finalData), "EX", 86400);
      } catch { /* non-fatal */ }
    }

    return NextResponse.json(finalData);
  } catch (error: unknown) {
    console.error("Distill Summarize API Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
