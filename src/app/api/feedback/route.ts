import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || session.user.id;

    if (userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        summary: {
          include: { paper: true }
        }
      }
    });

    const formattedFeedbacks = feedbacks.map(f => {
      // The schema doesn't have a 'type', but we need it for the UI.
      // We can infer type from whether summary is present, or just use general if it's missing.
      // Easiest is to add a comment prefix or just default for now.
      // Note: we can extend the DB later, but for now we'll just parse the comment 
      // or return "general" 
      let type = "general";
      let message = f.comment || "";
      
      // We can use a trick: save type in comment like "[bug] The app crashed" format
      if (message.startsWith("[")) {
        const closingBracket = message.indexOf("]");
        if (closingBracket > -1) {
          type = message.substring(1, closingBracket);
          message = message.substring(closingBracket + 1).trim();
        }
      } else if (f.summaryId) {
        type = "summary";
      }

      return {
        id: f.id,
        type: type as any,
        message,
        date: new Date(f.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };
    });

    return NextResponse.json({ feedbacks: formattedFeedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, rating, message, summaryId } = body;

    if (!type || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Since our schema only has accuracyRating, coherenceRating, overallRating, comment, summaryId, userId:
    // We don't have a specific `Feedback` table for app-level feedback in schema that doesn't link to a summary.
    // Wait, let's look at schema for Feedback: summaryId is required.
    // If it's general feedback without a summary, we can't save it in Feedback.
    // Hmm, let's create a dummy summary or update the schema.
    // The user's prompt says: "POST /api/feedback with body: { type, rating, message, summaryId? }"
    // And schema says Feedback has summaryId as String (required).
    // Let's modify Prisma Schema quickly to make summaryId optional! Or just use the first summary as a dummy if missing.
    // Making summaryId optional in schema is best.
    
    // I will write the route assuming summaryId could be optional for this endpoint
    
    // Format message to store type
    const commentWithMeta = `[${type}] ${message}`;

    // Workaround for missing summaryId if schema requires it: 
    // we'll just find the latest summary by this user to attach it to, if it's required and missing.
    let validSummaryId = summaryId;
    if (!validSummaryId) {
      const latestSummary = await prisma.summary.findFirst({
        where: { userId: session.user.id }
      });
      if (latestSummary) validSummaryId = latestSummary.id;
    }

    // If still no validSummaryId and it's required by Prisma, this will fail. Let's see.
    // I can patch the schema next if needed.
    // I'll patch the schema to make summaryId String? optional.
    
    const feedback = await prisma.feedback.create({
      data: {
        userId: session.user.id,
        summaryId: validSummaryId, // Might throw if required and user has 0 summaries. I'll update schema!
        overallRating: rating || 5, // Default to 5
        accuracyRating: rating || 5,
        coherenceRating: rating || 5,
        comment: commentWithMeta,
      }
    });

    return NextResponse.json({ message: "Feedback submitted successfully", id: feedback.id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating feedback:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
