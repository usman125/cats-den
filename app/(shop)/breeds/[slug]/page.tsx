import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { getBreedBySlug, getAllKittens } from "@/lib/dato";
import { Button, Badge, Card } from "@/components/ui";
import { KittenCard } from "@/components/shop";
import { getCharacteristics } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const breed = await getBreedBySlug(slug);

  if (!breed) {
    return { title: "Breed Not Found" };
  }

  return {
    title: `${breed.name} Kittens`,
    description: breed.description,
    openGraph: {
      title: `${breed.name} Kittens | Cat's Den`,
      description: breed.description,
      images: breed.image?.url ? [breed.image.url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${breed.name} Kittens`,
      description: breed.description,
      images: breed.image?.url ? [breed.image.url] : [],
    },
    alternates: {
      canonical: `/breeds/${slug}`,
    },
  };
}

export default async function BreedPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const breed = await getBreedBySlug(slug, preview);

  if (!breed) {
    notFound();
  }

  const kittensData = await getAllKittens({ breed: slug }, 1, 6, preview);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        {breed.image?.url ? (
          <Image
            src={breed.image.url}
            alt={breed.image.alt || breed.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-coral-light to-terracotta/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link
              href="/breeds"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              All breeds
            </Link>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">
              {breed.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card variant="elevated" className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                About {breed.name}
              </h2>
              <p className="text-charcoal-light leading-relaxed">
                {breed.description}
              </p>
            </Card>

            {/* Available kittens */}
            {kittensData.items.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-charcoal">
                    Available {breed.name} Kittens
                  </h2>
                  <Link href={`/kittens?breed=${slug}`}>
                    <Button variant="ghost" size="sm">
                      View all →
                    </Button>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {kittensData.items.map((kitten) => (
                    <KittenCard key={kitten.id} kitten={kitten} />
                  ))}
                </div>
              </div>
            )}

            {kittensData.items.length === 0 && (
              <Card variant="outlined" className="text-center py-12">
                <p className="text-5xl mb-4">🐱</p>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                  No kittens available
                </h3>
                <p className="text-charcoal-light mb-4">
                  We don&apos;t have any {breed.name} kittens available right
                  now, but check back soon!
                </p>
                <Link href="/contact">
                  <Button variant="outline">Contact Us for Updates</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card variant="elevated" className="sticky top-24">
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
                Characteristics
              </h3>

              {getCharacteristics(breed.characteristics).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {getCharacteristics(breed.characteristics).map((char) => (
                    <Badge key={char} variant="outline">
                      {char}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-cream-dark">
                <p className="text-sm text-charcoal-light mb-4">
                  Interested in a {breed.name} kitten? Browse our available
                  kittens or contact us for more information.
                </p>
                <div className="space-y-2">
                  <Link href={`/kittens?breed=${slug}`} className="block">
                    <Button
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Available Kittens
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}





