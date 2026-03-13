import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";

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

    const keys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const formattedKeys = keys.map((key) => ({
      id: key.id,
      name: key.name,
      maskedKey: key.maskedKey,
      key: key.key,
      tier: key.tier,
      created: new Date(key.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      usage: key.usage,
      limit: key.limit,
    }));

    return NextResponse.json({ keys: formattedKeys });
  } catch (error) {
    console.error("Error fetching keys:", error);
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
    const { name, role } = body; // role implies tier

    if (!name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTier = role || "BASIC";
    
    // Limits
    let limit = 1000;
    if (newTier === "RESEARCHER") limit = 10000;
    if (newTier === "ADMIN") limit = 50000;

    const rawKey = `distill_${crypto.randomBytes(32).toString('hex')}`;
    const maskedKey = `distill_••••••••${rawKey.slice(-4)}`;

    const newKey = await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        name,
        key: rawKey,
        maskedKey,
        tier: newTier,
        limit,
      }
    });

    return NextResponse.json({ 
      message: "API Key created", 
      key: rawKey,
      apiKey: {
        id: newKey.id,
        name: newKey.name,
        maskedKey: newKey.maskedKey,
        tier: newKey.tier,
        created: new Date(newKey.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        usage: newKey.usage,
        limit: newKey.limit,
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating key:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
