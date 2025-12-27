import { SkeletonCard } from "@/components/ui";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header skeleton */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 w-64 bg-cream-dark/50 rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-cream-dark/30 rounded-lg mx-auto mt-4 animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

