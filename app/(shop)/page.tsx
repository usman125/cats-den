import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui";
import { KittenCard, BreedCard, TestimonialCard } from "@/components/shop";
import { getHomepageData } from "@/lib/dato";

export const metadata: Metadata = {
  title: "Cat's Den | Premium Kittens for Loving Homes",
  description:
    "Find your perfect feline companion at Cat's Den. We offer healthy, well-socialized kittens from champion bloodlines including Ragdoll, Persian, Maine Coon, and more.",
  openGraph: {
    title: "Cat's Den | Premium Kittens for Loving Homes",
    description:
      "Find your perfect feline companion at Cat's Den. Healthy, well-socialized kittens from champion bloodlines.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cat's Den - Premium Kittens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat's Den | Premium Kittens for Loving Homes",
    description:
      "Find your perfect feline companion at Cat's Den. Healthy, well-socialized kittens from champion bloodlines.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const { isEnabled: preview } = await draftMode();
  const { featuredKittens, breeds, testimonials } = await getHomepageData(preview);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero paw-pattern overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-coral-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-6">
                🐾 Find Your Perfect Companion
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight">
                Welcome to{" "}
                <span className="text-terracotta">Cat&apos;s Den</span>
              </h1>
              <p className="text-xl text-charcoal-light mt-6 max-w-lg">
                Discover healthy, well-socialized kittens from champion
                bloodlines. We match loving families with their perfect feline
                companions.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/kittens">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Browse Kittens
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-cream-dark">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-terracotta" />
                  <span className="text-sm text-charcoal-light">
                    Health Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-terracotta" />
                  <span className="text-sm text-charcoal-light">
                    Champion Lines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-terracotta" />
                  <span className="text-sm text-charcoal-light">
                    Lifetime Support
                  </span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-slide-up delay-200">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Background circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-coral-light to-terracotta/20 rounded-full scale-90" />

                {/* Main image */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&h=800&fit=crop"
                    alt="Adorable kitten"
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute -left-4 top-1/4 bg-white rounded-xl p-3 shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">😻</span>
                    <div>
                      <p className="font-semibold text-charcoal">200+</p>
                      <p className="text-xs text-charcoal-light">
                        Happy Families
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/4 bg-white rounded-xl p-3 shadow-lg animate-float delay-300">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="font-semibold text-charcoal">4.9/5</p>
                      <p className="text-xs text-charcoal-light">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kittens */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Available Now
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
              Featured Kittens
            </h2>
            <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
              Meet our adorable kittens waiting for their forever homes. Each one
              comes with a health guarantee and lifetime support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredKittens.map((kitten, index) => (
              <div
                key={kitten.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <KittenCard kitten={kitten} priority={index < 3} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/kittens">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                View All Kittens
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Our Breeds
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
              Find Your Perfect Match
            </h2>
            <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
              We specialize in several beloved cat breeds, each with their own
              unique personality and charm.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {breeds.slice(0, 8).map((breed, index) => (
              <div
                key={breed.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BreedCard breed={breed} size="md" />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/breeds">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Explore All Breeds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-cream to-coral-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Why Cat&apos;s Den
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
              The Cat&apos;s Den Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Health Guarantee",
                description:
                  "All kittens come with comprehensive health screenings and a lifetime health guarantee.",
              },
              {
                icon: Award,
                title: "Champion Bloodlines",
                description:
                  "Our kittens are bred from award-winning, registered champion bloodlines.",
              },
              {
                icon: Heart,
                title: "Lifetime Support",
                description:
                  "We provide ongoing guidance and support throughout your kitten's life.",
              },
              {
                icon: Truck,
                title: "Safe Delivery",
                description:
                  "Professional, stress-free delivery to your home anywhere in the country.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 bg-white rounded-2xl shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-coral-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Happy Families
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your New Best Friend?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Browse our available kittens and find your perfect companion today.
            All kittens come with health guarantees and lifetime support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kittens">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Available Kittens
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-charcoal"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}





