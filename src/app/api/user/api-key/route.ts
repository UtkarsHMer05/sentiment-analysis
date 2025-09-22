import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import crypto from "crypto";

export async function GET(req: NextRequest) {
    try {
        console.log("🔑 Fetching API key for user");

        const session = await auth();

        if (!session?.user?.id) {
            console.warn("❌ Unauthorized API key request");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log(`👤 Getting API key for user: ${session.user.id}`);

        // Get the user's API quota which contains the secret key
        let apiQuota = await db.apiQuota.findUnique({
            where: {
                userId: session.user.id,
            },
            select: {
                secretKey: true,
            },
        });

        // If no API quota exists, create one with a free tier
        if (!apiQuota) {
            console.log("📝 Creating new API quota for user");
            apiQuota = await db.apiQuota.create({
                data: {
                    userId: session.user.id,
                    maxRequests: 10, // Free tier: 10 requests
                    requestsUsed: 0,
                    resetDate: new Date(),
                    secretKey: `sa_live_${crypto.randomBytes(24).toString("hex")}`,
                },
                select: {
                    secretKey: true,
                },
            });
            console.log("✅ API quota created for user");
        }

        console.log("✅ API key found for user");

        return NextResponse.json({
            apiKey: apiQuota.secretKey,
        });
    } catch (error) {
        console.error("❌ Error fetching API key:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
