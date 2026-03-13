import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || session.user.id; 
    
    // Ensure researcher can only fetch their own
    if (userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    
    const search = searchParams.get("search");
    const maxRating = searchParams.get("maxRating");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = { userId };
    
    if (search) {
      whereClause.OR = [
        { paper: { title: { contains: search, mode: "insensitive" } } },
        { paper: { pubmedId: { contains: search } } }
      ];
    }
    
    if (maxRating) {
      // Find low quality summaries (for admin mostly)
      // Since rating is in feedback, we'd have to join. But let's check what's requested
      // The user said: "Low quality summaries: GET /api/summaries?maxRating=2"
      // Actually average rating takes some logic, let's join Feedbacks
      whereClause.feedbacks = {
        some: {
          overallRating: { lte: parseInt(maxRating) }
        }
      };
    }

    const [summaries, total] = await Promise.all([
      prisma.summary.findMany({
        where: whereClause,
        include: {
          paper: true,
          feedbacks: {
            select: { overallRating: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.summary.count({ where: whereClause })
    ]);

    // Format the response for the frontend SummaryItem interface
    const formattedSummaries = summaries.map(s => {
      // average rating if there is feedback
      const avgRating = s.feedbacks.length > 0 
        ? Math.round(s.feedbacks.reduce((acc, curr) => acc + curr.overallRating, 0) / s.feedbacks.length)
        : 0;

      return {
        id: s.id,
        paperTitle: s.paper.title,
        pmid: s.paper.pubmedId,
        year: s.paper.publishedDate ? new Date(s.paper.publishedDate).getFullYear().toString() : "Unknown",
        dateAdded: new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        rating: avgRating,
        keyFindings: s.keyFindings.length > 0 ? s.keyFindings[0] : "", // Simplified for card
        methodology: s.methodology.length > 0 ? s.methodology[0] : "",
        conclusions: s.conclusions.length > 0 ? s.conclusions[0] : "",
        limitations: s.limitations.length > 0 ? s.limitations[0] : "",
        isPdf: s.paper.sourceType === "PDF"
      };
    });

    return NextResponse.json({
      summaries: formattedSummaries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
