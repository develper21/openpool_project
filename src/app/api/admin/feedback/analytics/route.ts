import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // `ratingDistribution: {1,2,3,4,5}`
    const feedbacks = await prisma.feedback.findMany({
      select: {
        id: true,
        overallRating: true,
        createdAt: true,
      }
    });

    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbacks.forEach(f => {
      if (f.overallRating >= 1 && f.overallRating <= 5) {
        ratingDistribution[f.overallRating]++;
      }
    });

    // `recentFeedback[]`
    const recentDb = await prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, role: true } },
        summary: { select: { paper: { select: { title: true } } } }
      }
    });

    const recentFeedback = recentDb.map(f => ({
      id: f.id,
      user: f.user.name,
      role: f.user.role,
      rating: f.overallRating,
      comment: f.comment,
      paperTarget: f.summary?.paper?.title || "General",
      date: new Date(f.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }));

    // `dailyAvg[]` for the line chart (mocking the last 7 days from available data)
    // To properly calculate, group by day.
    const last7Days = new Array(7).fill(0).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    });

    const dailyData: Record<string, { sum: number, count: number }> = {};
    last7Days.forEach(day => dailyData[day] = { sum: 0, count: 0 });

    feedbacks.forEach(f => {
      const day = f.createdAt.toISOString().split("T")[0];
      if (dailyData[day]) {
        dailyData[day].sum += f.overallRating;
        dailyData[day].count += 1;
      }
    });

    const dailyAvg = last7Days.map(day => {
      const data = dailyData[day];
      return {
        label: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
        avg: data.count > 0 ? Number((data.sum / data.count).toFixed(1)) : 0, 
      };
    });

    return NextResponse.json({
      ratingDistribution,
      recentFeedback,
      dailyAvg
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
