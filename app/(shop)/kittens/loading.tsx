import { SkeletonCard } from "@/components/ui";

export default function KittensLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 w-48 bg-cream-dark/50 rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-80 max-w-full bg-cream-dark/30 rounded-lg mx-auto mt-4 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="h-6 w-24 bg-cream-dark rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-cream-dark/50 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid skeleton */}
          <main className="flex-1">
            <div className="h-6 w-40 bg-cream-dark/50 rounded animate-pulse mb-6" />
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

