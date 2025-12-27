import { Suspense } from "react";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { KittenCard } from "@/components/shop";
import { KittenFilters } from "@/components/shop/kitten-filters";
import { Pagination } from "@/components/shop/pagination";
import { SkeletonCard } from "@/components/ui";
import { getAllKittens, getAllBreeds } from "@/lib/dato";
import type { KittenFilters as KittenFiltersType } from "@/types";

export const metadata: Metadata = {
  title: "Available Kittens",
  description:
    "Browse our selection of healthy, well-socialized kittens available for adoption. Find your perfect feline companion today.",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    breed?: string;
    gender?: string;
    availability?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

export default async function KittensPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { isEnabled: preview } = await draftMode();
  const page = parseInt(params.page || "1", 10);
  const pageSize = 12;

  const filters: KittenFiltersType = {
    breed: params.breed,
    gender: params.gender as "male" | "female" | undefined,
    availability: params.availability as "available" | "reserved" | "sold" | undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
    search: params.search,
  };

  const [kittensData, breeds] = await Promise.all([
    getAllKittens(filters, page, pageSize, preview),
    getAllBreeds(preview),
  ]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Our Kittens
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Find your perfect feline companion from our selection of healthy,
            well-socialized kittens. Each comes with a health guarantee.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="animate-pulse h-96 bg-cream-dark rounded-2xl" />}>
              <KittenFilters breeds={breeds} currentFilters={filters} />
            </Suspense>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-charcoal-light">
                Showing{" "}
                <span className="font-medium text-charcoal">
                  {kittensData.items.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-charcoal">
                  {kittensData.total}
                </span>{" "}
                kittens
              </p>
            </div>

            {/* Kittens grid */}
            {kittensData.items.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {kittensData.items.map((kitten) => (
                  <KittenCard key={kitten.id} kitten={kitten} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-6xl mb-4">🐱</p>
                <h2 className="font-heading text-2xl font-semibold text-charcoal mb-2">
                  No kittens found
                </h2>
                <p className="text-charcoal-light">
                  Try adjusting your filters to find available kittens.
                </p>
              </div>
            )}

            {/* Pagination */}
            {kittensData.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={kittensData.page}
                  totalPages={kittensData.totalPages}
                  baseUrl="/kittens"
                  searchParams={params}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Loading state
export function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}





