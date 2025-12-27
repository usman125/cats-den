import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  Heart,
  Syringe,
  Cpu,
  Calendar,
  MapPin,
} from "lucide-react";
import { getKittenBySlug, getKittensByBreed } from "@/lib/dato";
import { getCharacteristics } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";
import { KittenCard } from "@/components/shop";
import { ImageGallery } from "@/components/shop/image-gallery";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const kitten = await getKittenBySlug(slug);

  if (!kitten) {
    return { title: "Kitten Not Found" };
  }

  const imageUrl = kitten.thumbnail?.url || kitten.images?.[0]?.url;
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(kitten.price);

  return {
    title: `${kitten.name} - ${kitten.breed.name}`,
    description: `${kitten.name} is a beautiful ${kitten.age} old ${kitten.gender} ${kitten.breed.name} kitten available for ${priceFormatted}. ${kitten.description}`,
    openGraph: {
      title: `${kitten.name} - ${kitten.breed.name} Kitten | Cat's Den`,
      description: kitten.description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${kitten.name} - ${kitten.breed.name} kitten`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${kitten.name} - ${kitten.breed.name}`,
      description: kitten.description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/kitten/${slug}`,
    },
  };
}

export default async function KittenPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const kitten = await getKittenBySlug(slug, preview);

  if (!kitten) {
    notFound();
  }

  const relatedKittens = await getKittensByBreed(kitten.breed.id, 4, preview);
  const filteredRelated = relatedKittens.filter((k) => k.id !== kitten.id);

  // Map availability values to badge styles (case-insensitive)
  const availabilityMap: Record<string, { variant: "success" | "warning" | "danger" | "default"; label: string }> = {
    available: { variant: "success", label: "Available for Adoption" },
    reserved: { variant: "warning", label: "Reserved" },
    sold: { variant: "danger", label: "Already Adopted" },
  };
  
  const normalizedAvailability = (kitten.availability || "").toLowerCase().trim();
  const availabilityStatus = availabilityMap[normalizedAvailability] || {
    variant: "default" as const,
    label: kitten.availability || "Unknown",
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-gradient-hero py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/kittens"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to all kittens
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="animate-slide-up">
            <ImageGallery images={kitten.images} name={kitten.name} />
          </div>

          {/* Details */}
          <div className="animate-slide-up delay-100">
            {/* Availability badge */}
            <Badge variant={availabilityStatus.variant} size="md" className="mb-4">
              {availabilityStatus.label}
            </Badge>

            {/* Breed */}
            <Link
              href={`/breeds/${kitten.breed.slug}`}
              className="text-terracotta font-medium hover:underline"
            >
              {kitten.breed.name}
            </Link>

            {/* Name */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mt-2 flex items-center gap-3">
              {kitten.name}
              <span
                className={
                  kitten.gender === "male" ? "text-blue-500" : "text-pink-500"
                }
              >
                {kitten.gender === "male" ? "♂" : "♀"}
              </span>
            </h1>

            {/* Price */}
            <p className="font-heading text-3xl font-bold text-terracotta mt-4">
              {formatPrice(kitten.price)}
            </p>
            <p className="text-sm text-charcoal-light mt-1">
              Includes health guarantee & starter kit
            </p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-4 mt-8 p-4 bg-white rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-light rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-light">Age</p>
                  <p className="font-medium text-charcoal">{kitten.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-light rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-light">Gender</p>
                  <p className="font-medium text-charcoal capitalize">
                    {kitten.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-light rounded-lg flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-light">Vaccinated</p>
                  <p className="font-medium text-charcoal">
                    {kitten.vaccinated ? "Yes" : "Not yet"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-light rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-xs text-charcoal-light">Microchipped</p>
                  <p className="font-medium text-charcoal">
                    {kitten.microchipped ? "Yes" : "Not yet"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">
                About {kitten.name}
              </h2>
              <p className="text-charcoal-light leading-relaxed">
                {kitten.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <AddToCartButton kitten={kitten} />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Link href="/contact" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Ask a Question
                  </Button>
                </Link>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-8 p-4 bg-sage/20 rounded-2xl border border-sage">
              <h3 className="font-heading font-semibold text-charcoal flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-sage-dark" />
                Our Guarantees
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sage-dark rounded-full" />
                  Health guarantee included
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sage-dark rounded-full" />
                  All vaccinations up to date
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sage-dark rounded-full" />
                  Lifetime breeder support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sage-dark rounded-full" />
                  Starter kit included
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-charcoal-light">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Available for pickup or delivery</span>
            </div>
          </div>
        </div>

        {/* Breed info */}
        <div className="mt-16 p-8 bg-white rounded-2xl">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
            About {kitten.breed.name} Cats
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-4">
            {kitten.breed.description}
          </p>
          {getCharacteristics(kitten.breed.characteristics).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getCharacteristics(kitten.breed.characteristics).map((char) => (
                <Badge key={char} variant="outline">
                  {char}
                </Badge>
              ))}
            </div>
          )}
          <Link href={`/breeds/${kitten.breed.slug}`}>
            <Button variant="ghost" className="mt-4">
              Learn more about {kitten.breed.name} →
            </Button>
          </Link>
        </div>

        {/* Related kittens */}
        {filteredRelated.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
              More {kitten.breed.name} Kittens
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelated.slice(0, 4).map((relatedKitten) => (
                <KittenCard key={relatedKitten.id} kitten={relatedKitten} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





