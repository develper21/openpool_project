import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    // Fetch total papers summarized
    const papersSummarizedCount = await prisma.summary.count({
      where: { userId },
    });

    // Fetch feedback given
    const feedbackGivenCount = await prisma.feedback.count({
      where: { userId },
    });

    // Fetch API Calls today
    // For now returning the overall count or simulating today if we don't have a daily breakdown
    // `apiCallsCount` is total on user.
    const apiCallsToday = user.apiCallsCount;

    // Fetch recent summaries
    const recentSummariesData = await prisma.summary.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        paper: true,
      },
    });

    const recentSummaries = recentSummariesData.map((summary) => ({
      id: summary.id,
      title: summary.paper.title,
      pmid: summary.paper.pubmedId || "N/A",
      date: summary.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      status: summary.status.toLowerCase(), // COMPLETE, PENDING -> complete, pending
    }));

    return NextResponse.json(
      {
        stats: {
          papersSummarized: papersSummarizedCount,
          apiCallsToday,
          feedbackGiven: feedbackGivenCount,
        },
        recentSummaries,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
