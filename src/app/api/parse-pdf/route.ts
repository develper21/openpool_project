import { NextResponse } from "next/server";
import PDFParser from "pdf2json";

// ── App Router API: Parse PDF → Extract text → Call /api/summarize ──
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    if (
      !file.name.toLowerCase().endsWith(".pdf") &&
      file.type !== "application/pdf"
    ) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF is supported." },
        { status: 400 }
      );
    }

    // ── 1. Extract raw text from the PDF buffer ──
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extractedText = await new Promise<string>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on(
        "pdfParser_dataError",
        (errMsg: Error | { parserError: Error }) => {
          const error =
            errMsg instanceof Error ? errMsg : errMsg.parserError;
          reject(error);
        }
      );

      pdfParser.on("pdfParser_dataReady", () => {
        const text = pdfParser.getRawTextContent();
        resolve(text);
      });

      pdfParser.parseBuffer(buffer);
    });

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this PDF. It might be scanned/image-only.",
        },
        { status: 422 }
      );
    }

    // Clean up text injected by pdf2json
    const cleanText = extractedText
      .replace(/\r\n/g, "\n")
      .replace(/\n\s*\n/g, "\n\n");

    if (cleanText.length < 100) {
      return NextResponse.json(
        {
          error:
            "Extracted text is too short (< 100 chars). The PDF may not contain enough readable content.",
        },
        { status: 422 }
      );
    }

    // ── 2. Forward to /api/summarize internally ──
    const requestUrl = new URL(req.url);
    const summarizeUrl = `${requestUrl.origin}/api/summarize`;

    const summarizeResponse = await fetch(summarizeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({ pdfText: cleanText }),
    });

    const summaryData = await summarizeResponse.json();

    if (!summarizeResponse.ok) {
      return NextResponse.json(summaryData, {
        status: summarizeResponse.status,
      });
    }

    return NextResponse.json({
      ...summaryData,
      pdfFileName: file.name,
      extractedTextLength: cleanText.length,
    });
  } catch (error: unknown) {
    console.error("PDF Parse Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An error occurred while parsing the PDF document.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
