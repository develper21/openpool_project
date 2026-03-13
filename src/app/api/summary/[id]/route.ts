import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const summary = await prisma.summary.findUnique({
      where: { id },
      include: {
        paper: true,
        feedbacks: true,
      },
    });

    if (!summary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    if (summary.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const avgRating = summary.feedbacks.length > 0 
      ? Math.round(summary.feedbacks.reduce((acc: number, curr: any) => acc + curr.overallRating, 0) / summary.feedbacks.length)
      : 0;

    return NextResponse.json({
      id: summary.id,
      paperTitle: summary.paper.title,
      pmid: summary.paper.pubmedId,
      year: summary.paper.publishedDate ? new Date(summary.paper.publishedDate).getFullYear().toString() : "Unknown",
      dateAdded: new Date(summary.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      rating: avgRating,
      keyFindings: summary.keyFindings.join("\n\n"),
      methodology: summary.methodology.join("\n\n"),
      conclusions: summary.conclusions.join("\n\n"),
      limitations: summary.limitations.join("\n\n"),
      isPdf: summary.paper.sourceType === "PDF",
    });

  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const summary = await prisma.summary.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!summary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    if (summary.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.summary.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Error deleting summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
