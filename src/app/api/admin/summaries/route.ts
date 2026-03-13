import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const filter = searchParams.get("filter"); // PDF, PubMed, Highly Rated, Needs Review
    const sort = searchParams.get("sort"); // Newest, Oldest, Highest Rated, Lowest Rated

    const includeClause = {
      user: { select: { name: true } },
      paper: true,
      feedbacks: { select: { overallRating: true } },
    };

    let summaries = await prisma.summary.findMany({
      include: includeClause,
    });

    if (search) {
      const lowerSearch = search.toLowerCase();
      summaries = summaries.filter(s =>
        s.paper.title.toLowerCase().includes(lowerSearch) ||
        (s.paper.pubmedId && s.paper.pubmedId.toLowerCase().includes(lowerSearch))
      );
    }

    let processedSummaries = summaries.map((s) => {
      const avgRating = s.feedbacks.length > 0
        ? s.feedbacks.reduce((acc, curr) => acc + curr.overallRating, 0) / s.feedbacks.length
        : 0;

      return {
        id: s.id,
        title: s.paper.title,
        pmid: s.paper.pubmedId,
        user: s.user.name,
        date: new Date(s.createdAt).toISOString(),
        rating: avgRating,
        status: s.status === "COMPLETED" ? "Completed" : s.status === "FAILED" ? "Failed" : "Processing",
        source: s.paper.sourceType === "PUBMED" ? "PubMed" : "PDF",
      };
    });

    if (filter === "PDF") {
      processedSummaries = processedSummaries.filter(s => s.source === "PDF");
    } else if (filter === "PubMed") {
      processedSummaries = processedSummaries.filter(s => s.source === "PubMed");
    } else if (filter === "Highly Rated") {
      processedSummaries = processedSummaries.filter(s => s.rating >= 4);
    } else if (filter === "Needs Review") {
      processedSummaries = processedSummaries.filter(s => s.rating > 0 && s.rating < 3); // 0 means unrated typically, assume < 3 is needs review
    }

    processedSummaries.sort((a, b) => {
      if (sort === "Newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Lowest Rated") return a.rating - b.rating;
      
      // Default newest
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({
      summaries: processedSummaries,
    });
  } catch (error) {
    console.error("Error fetching admin summaries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
