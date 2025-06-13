"use server";

import { hash } from "bcryptjs";
import { db } from "~/server/db";
import crypto from "crypto";

// ✅ FIXED: Create a server-side type that only includes what we need
type RegisterUserData = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterUserData) {
  try {
    const { name, email, password } = data;

    // Basic validation
    if (!name || !email || !password) {
      console.error("❌ Missing required fields");
      return { error: "All fields are required" };
    }

    if (password.length < 8) {
      console.error("❌ Password too short");
      return { error: "Password must be at least 8 characters" };
    }

    // Check if user exist
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ User already exists:", email);
      return { error: "User already exist" };
    }

    const hashedPassword = await hash(password, 12);

    console.log("🔄 Creating user with email:", email);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        apiQuota: {
          create: {
            maxRequests: 10,
            requestsUsed: 0,
            resetDate: new Date(),
            secretKey: `sa_live_${crypto.randomBytes(24).toString("hex")}`,
          },
        },
      },
      include: {
        apiQuota: true, // Include the created apiQuota in the response
      },
    });

    console.log("✅ User created successfully:", {
      userId: newUser.id,
      email: newUser.email,
      hasApiQuota: !!newUser.apiQuota,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Registration error:", error);

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return { error: "User already exists" };
      }
      if (error.message.includes("Foreign key constraint")) {
        return { error: "Database relationship error" };
      }
    }

    return { error: "Something went wrong" };
  }
}
