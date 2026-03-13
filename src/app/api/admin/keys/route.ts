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

    const rawKeys = await prisma.apiKey.findMany({
      include: {
        user: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    const keys = rawKeys.map(k => ({
      id: k.id,
      name: k.name,
      owner: k.user.name,
      tier: k.tier,
      created: new Date(k.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      usage: k.usage,
      limit: k.limit,
      status: k.isActive ? "Active" : "Revoked",
      key: k.key,
    }));

    // Generate weekly usage per key (just mock aggregated for now since we don't track daily usage per key in schema)
    const weeklyUsagePerKey = keys.slice(0, 5).map(k => ({
      name: k.name,
      calls: Math.floor(Math.random() * 2000), // mock for chart since no history available
      tier: k.tier,
    }));

    return NextResponse.json({
      keys,
      weeklyUsagePerKey,
    });
  } catch (error) {
    console.error("Error fetching admin keys:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Revoke key
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Key ID required" }, { status: 400 });

    await prisma.apiKey.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Key revoked successfully" });
  } catch (error) {
    console.error("Error revoking admin key:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
