"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ShopError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Shop error:", error);
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("ECONNREFUSED");

  const isContentError =
    error.message.includes("graphql") ||
    error.message.includes("datocms") ||
    error.message.includes("API");

  let title = "Something went wrong";
  let description =
    "We couldn't load this page. Please try again.";

  if (isNetworkError) {
    title = "Connection Error";
    description =
      "Unable to connect to our servers. Please check your internet connection.";
  } else if (isContentError) {
    title = "Content Unavailable";
    description =
      "We're having trouble loading our kitten catalog. Please try again in a moment.";
  }

  return (
    <div className="min-h-[60vh] bg-cream flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <h1 className="font-heading text-2xl font-bold text-charcoal mb-3">
          {title}
        </h1>
        <p className="text-charcoal-light mb-6">{description}</p>

        {error.digest && (
          <p className="text-xs text-charcoal-light/50 mb-4">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/kittens">
            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
              <ShoppingBag className="w-4 h-4" />
              Browse Kittens
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-4xl opacity-40">🐱</div>
      </div>
    </div>
  );
}

