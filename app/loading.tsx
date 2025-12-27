export default function RootLoading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        {/* Animated cat logo */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto bg-terracotta/10 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl animate-bounce">🐱</span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="flex items-center justify-center gap-1">
          <span className="text-charcoal-light">Loading</span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}

