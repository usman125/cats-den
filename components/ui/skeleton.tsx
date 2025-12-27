"use client";

import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) => {
  const variants = {
    text: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-cream-dark",
        variants[variant],
        className
      )}
      style={{
        width: width,
        height: height || (variant === "text" ? "1em" : undefined),
      }}
    />
  );
};

// Pre-built skeleton patterns
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 border border-cream-dark">
    <Skeleton variant="rounded" className="w-full h-48 mb-4" />
    <Skeleton className="w-3/4 h-6 mb-2" />
    <Skeleton className="w-1/2 h-4 mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton className="w-20 h-6" />
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>
  </div>
);

const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={cn(
          "h-4",
          i === lines - 1 ? "w-2/3" : "w-full"
        )}
      />
    ))}
  </div>
);

export { Skeleton, SkeletonCard, SkeletonText };










