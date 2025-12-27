import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/user";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAccount = nextUrl.pathname.startsWith("/account");
      const isOnCheckout = nextUrl.pathname.startsWith("/checkout");

      if (isOnAccount || isOnCheckout) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        try {
          const db = await connectToDatabase();

          if (!db) {
            // Database not configured - log but don't expose to user
            console.error("Database connection not available");
            throw new Error("Service temporarily unavailable");
          }

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            return null;
          }

          const isValidPassword = await user.comparePassword(password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          // Log error details for debugging
          console.error("Auth error:", error);
          
          // Determine error type
          if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (
              message.includes("mongo") ||
              message.includes("econnrefused") ||
              message.includes("etimedout")
            ) {
              throw new Error("Service temporarily unavailable. Please try again.");
            }
          }
          
          // For security, don't expose specific error details
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};










