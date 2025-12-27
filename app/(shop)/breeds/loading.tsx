export default function BreedsLoading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 w-48 bg-cream-dark/50 rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-cream-dark/30 rounded-lg mx-auto mt-4 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse"
            >
              <div className="h-48 bg-cream-dark" />
              <div className="p-6">
                <div className="h-6 w-32 bg-cream-dark rounded mb-3" />
                <div className="h-4 bg-cream-dark/50 rounded mb-2" />
                <div className="h-4 w-3/4 bg-cream-dark/50 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-cream-dark/30 rounded-full" />
                  <div className="h-6 w-20 bg-cream-dark/30 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

