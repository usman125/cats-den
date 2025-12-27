"use client";

import Link from "next/link";
import { X, Eye } from "lucide-react";

interface PreviewBannerProps {
  isEnabled: boolean;
}

/**
 * Banner shown when preview/draft mode is active
 * Provides a way to exit preview mode
 */
export function PreviewBanner({ isEnabled }: PreviewBannerProps) {
  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-charcoal text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-terracotta" />
          <span className="text-sm font-medium">Preview Mode</span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <Link
          href="/api/preview/disable"
          className="flex items-center gap-1 text-sm text-coral-light hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Exit
        </Link>
      </div>
    </div>
  );
}

export default PreviewBanner;






