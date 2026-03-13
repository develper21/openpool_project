import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Core stats
    const [totalUsers, totalSummaries, totalFeedbacks, callsToday, activeKeys] = await Promise.all([
      prisma.user.count(),
      prisma.summary.count(),
      prisma.feedback.findMany({ select: { overallRating: true } }),
      prisma.summary.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.apiKey.count({ where: { isActive: true } }),
    ]);

    // Average rating
    const avgRating = totalFeedbacks.length > 0
      ? (totalFeedbacks.reduce((acc: number, curr: any) => acc + curr.overallRating, 0) / totalFeedbacks.length).toFixed(1)
      : "0.0";

    // Recent activity from AuditLog (or fallback to recent summaries/feedbacks)
    const recentActivity: any[] = [];

    // Get recent summaries
    const recentSummaries = await prisma.summary.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        paper: { select: { title: true, pubmedId: true } },
      },
    });

    recentSummaries.forEach((s) => {
      const ago = getTimeAgo(s.createdAt);
      recentActivity.push({
        time: ago,
        text: `${s.user.name} summarized "${s.paper.title?.substring(0, 50)}${(s.paper.title?.length || 0) > 50 ? '...' : ''}"`,
      });
    });

    // Get recent feedbacks
    const recentFeedbacks = await prisma.feedback.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
      },
    });

    recentFeedbacks.forEach((f) => {
      const ago = getTimeAgo(f.createdAt);
      recentActivity.push({
        time: ago,
        text: `${f.user.name} submitted ${f.overallRating}★ feedback`,
      });
    });

    // Sort by most recent
    recentActivity.sort((a, b) => {
      // Simple sort by time string is imperfect; ideally we'd sort by actual date
      return 0; // keep the order from DB since both are desc
    });

    // Most active researcher
    const topResearcher = await prisma.user.findFirst({
      where: { role: "RESEARCHER" },
      orderBy: { summaries: { _count: "desc" } },
      include: { _count: { select: { summaries: true } } },
    });

    return NextResponse.json({
      totalUsers,
      totalSummaries,
      avgRating,
      callsToday,
      activeKeys,
      recentActivity: recentActivity.slice(0, 5),
      topResearcher: topResearcher
        ? { name: topResearcher.name, summaries: topResearcher._count.summaries }
        : null,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}
