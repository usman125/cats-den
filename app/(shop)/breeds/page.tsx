import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getAllBreeds } from "@/lib/dato";
import { BreedCard } from "@/components/shop";

export const metadata: Metadata = {
  title: "Cat Breeds",
  description:
    "Explore our selection of purebred cat breeds. Learn about their unique characteristics, personalities, and find the perfect match for your family.",
};

export default async function BreedsPage() {
  const { isEnabled: preview } = await draftMode();
  const breeds = await getAllBreeds(preview);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
            Our Breeds
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Cat Breeds
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Explore our selection of purebred cats. Each breed has its own unique
            personality and characteristics. Find the perfect match for your
            family.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds.map((breed, index) => (
            <div
              key={breed.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BreedCard breed={breed} size="lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





