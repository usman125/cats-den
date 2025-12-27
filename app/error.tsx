"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("Application error:", error);
  }, [error]);

  // Determine error type for user-friendly message
  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("ECONNREFUSED") ||
    error.message.includes("getaddrinfo");

  const isDatabaseError =
    error.message.includes("mongo") ||
    error.message.includes("database") ||
    error.message.includes("MONGODB");

  const isAPIError =
    error.message.includes("API") ||
    error.message.includes("graphql") ||
    error.message.includes("datocms");

  let title = "Something went wrong";
  let description =
    "We apologize for the inconvenience. Please try again or contact support if the problem persists.";

  if (isNetworkError) {
    title = "Connection Error";
    description =
      "We're having trouble connecting to our servers. Please check your internet connection and try again.";
  } else if (isDatabaseError) {
    title = "Service Temporarily Unavailable";
    description =
      "We're experiencing some technical difficulties. Our team has been notified and is working on it.";
  } else if (isAPIError) {
    title = "Content Loading Error";
    description =
      "We couldn't load the content you requested. Please try again in a moment.";
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">
          {title}
        </h1>
        <p className="text-charcoal-light mb-8">{description}</p>

        {/* Error ID for support */}
        {error.digest && (
          <p className="text-sm text-charcoal-light/60 mb-6">
            Error ID: <code className="bg-cream-dark px-2 py-1 rounded">{error.digest}</code>
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 text-terracotta hover:underline inline-flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back to previous page
        </button>

        {/* Cat illustration */}
        <div className="mt-12 text-6xl opacity-50">😿</div>
      </div>
    </div>
  );
}

