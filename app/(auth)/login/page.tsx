import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Card } from "@/components/ui";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Cat's Den account to manage your orders and track your kitten adoption.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center">
              <span className="text-3xl">🐱</span>
            </div>
            <span className="font-heading text-2xl font-bold text-charcoal">
              Cat&apos;s Den
            </span>
          </Link>
        </div>

        <Card variant="elevated" className="animate-scale-in">
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold text-charcoal">
              Welcome Back
            </h1>
            <p className="text-charcoal-light mt-1">
              Sign in to your account to continue
            </p>
          </div>

          <Suspense fallback={<div className="animate-pulse h-64 bg-cream-dark rounded-xl" />}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 text-center">
            <p className="text-charcoal-light">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-terracotta font-medium hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </Card>

        <p className="text-center text-sm text-charcoal-light mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-terracotta hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-terracotta hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
