"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-heading font-bold text-terracotta/20">
            404
          </div>
          <div className="text-6xl -mt-4">🐱</div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-charcoal-light mb-8">
          Oops! It looks like this kitten wandered off. The page you&apos;re looking
          for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/kittens">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4" />
              Browse Kittens
            </Button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-cream-dark">
          <p className="text-sm text-charcoal-light mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/breeds"
              className="text-terracotta hover:underline"
            >
              View Breeds
            </Link>
            <Link href="/about" className="text-terracotta hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-terracotta hover:underline">
              Contact
            </Link>
            <Link href="/blog" className="text-terracotta hover:underline">
              Blog
            </Link>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 text-charcoal-light hover:text-terracotta inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>
    </div>
  );
}

