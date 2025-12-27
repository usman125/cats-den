import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Heart, Award, Users, ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { StructuredTextRenderer } from "@/components/dato";
import { getPageBySlug } from "@/lib/dato";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  
  // Use SEO field from DatoCMS if available
  const seo = page?.seo;
  
  const metadata: Metadata = {
    title: seo?.title || page?.title || "About Us",
    description: seo?.description || 
      "Learn about Cat's Den - your trusted source for healthy, well-socialized kittens from champion bloodlines.",
  };

  if (seo?.image?.url) {
    metadata.openGraph = {
      images: [seo.image.url],
    };
  }

  return metadata;
}

export const revalidate = 3600; // Revalidate every hour

export default async function AboutPage() {
  // Fetch the "about" page content from DatoCMS
  const page = await getPageBySlug("about");

  const stats = [
    { value: "200+", label: "Happy Families" },
    { value: "15+", label: "Years Experience" },
    { value: "6", label: "Premium Breeds" },
    { value: "100%", label: "Health Guarantee" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Love & Care",
      description:
        "Every kitten is raised with love in our home, socialized with children and other pets.",
    },
    {
      icon: Shield,
      title: "Health First",
      description:
        "Regular vet checkups, vaccinations, and comprehensive health screening for all kittens.",
    },
    {
      icon: Award,
      title: "Quality Bloodlines",
      description:
        "We breed from champion bloodlines to ensure the best temperament and health.",
    },
    {
      icon: Users,
      title: "Lifetime Support",
      description:
        "We're here for you and your kitten throughout their entire life journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-6">
                Our Story
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6">
                {page?.title || "About Cat's Den"}
              </h1>
              
              {/* If we have CMS content, render it; otherwise show fallback */}
              {page?.content?.value ? (
                <div className="text-charcoal-light">
                  <StructuredTextRenderer content={page.content.value} />
                </div>
              ) : (
                <>
                  <p className="text-lg text-charcoal-light mb-6">
                    For over 15 years, we&apos;ve been dedicated to breeding healthy,
                    beautiful kittens and matching them with loving families. Our
                    passion for cats started as a family hobby and has grown into a
                    trusted cattery known for quality and care.
                  </p>
                  <p className="text-charcoal-light">
                    Every kitten that leaves our home is not just a pet—they&apos;re
                    family. We take pride in raising well-socialized, healthy kittens
                    that bring joy to families around the world.
                  </p>
                </>
              )}
            </div>
            <div className="relative animate-slide-up delay-200">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop"
                  alt="Cat's Den"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-terracotta">
                  {stat.value}
                </p>
                <p className="text-cream/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                variant="gradient"
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-coral-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-charcoal-light">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
              Our Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              From Our Home to Yours
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Careful Breeding",
                  description:
                    "We select breeding pairs based on health, temperament, and breed standards to ensure the best qualities in every kitten.",
                },
                {
                  step: "02",
                  title: "Early Socialization",
                  description:
                    "Kittens are raised in our home with daily handling, exposure to various sounds, children, and other pets.",
                },
                {
                  step: "03",
                  title: "Health Screening",
                  description:
                    "Every kitten receives comprehensive health checks, vaccinations, and is cleared by our veterinarian before adoption.",
                },
                {
                  step: "04",
                  title: "Perfect Match",
                  description:
                    "We work with families to match them with a kitten that fits their lifestyle and preferences.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-terracotta text-white rounded-2xl flex items-center justify-center font-heading text-xl font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-charcoal-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-terracotta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Meet Your New Best Friend?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Browse our available kittens or contact us to learn more about our
            upcoming litters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kittens">
              <Button
                size="lg"
                className="bg-white text-terracotta hover:bg-cream"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Browse Kittens
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-terracotta"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
