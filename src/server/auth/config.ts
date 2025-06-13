// server/auth/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "~/schemas/auth";
// Remove this line: import { randomBytes } from "crypto";
import { db } from "~/server/db";
import { stripe } from "~/lib/stripe";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 Authorize attempt:", { email: credentials?.email });

          // Validate input
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing credentials");
            return null;
          }

          // Parse with schema
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            console.log("❌ Schema validation failed:", validatedFields.error);
            return null;
          }

          const { email, password } = validatedFields.data;

          // Find user
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log("❌ User not found");
            return null;
          }

          if (!user.password) {
            console.log("❌ User has no password");
            return null;
          }

          // Compare password
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            console.log("❌ Invalid password");
            return null;
          }

          console.log("✅ Authentication successful");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("🚨 Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  // Add the events configuration here
  events: {
    createUser: async ({ user }) => {
      if (user.email && user.id) {
        try {
          console.log("🎯 Creating Stripe customer for user:", user.email);

          // Create Stripe customer
          const customer = await stripe.customers.create({
            email: user.email,
            name: user.name || undefined,
            metadata: {
              userId: user.id,
            },
          });

          console.log("✅ Stripe customer created:", customer.id);

          // Update user with Stripe customer ID
          await db.user.update({
            where: { id: user.id },
            data: { stripeCustomerId: customer.id },
          });

          console.log("✅ User updated with Stripe customer ID");

          // Create initial quota with Web Crypto API
          await db.apiQuota.create({
            data: {
              userId: user.id,
              maxRequests: 10,
              requestsUsed: 0,
              resetDate: new Date(),
              // Replace randomBytes with Web Crypto API
              secretKey: Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join(""),
            },
          });

          console.log("✅ Initial quota created for user");
        } catch (error) {
          console.error("🚨 Error creating Stripe customer:", error);
        }
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
