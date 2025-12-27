import { Metadata } from "next";
import Link from "next/link";
import { Shield, Syringe, Stethoscope, Heart, FileText, ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Health Guarantee",
  description:
    "Our comprehensive health guarantee ensures you receive a healthy, happy kitten. Learn about our commitment to quality and kitten wellness.",
};

export default function HealthGuaranteePage() {
  const healthFeatures = [
    {
      icon: Stethoscope,
      title: "Veterinary Checked",
      description:
        "Every kitten receives a comprehensive health examination by a licensed veterinarian before going home.",
    },
    {
      icon: Syringe,
      title: "Vaccinations",
      description:
        "All age-appropriate vaccinations are administered according to veterinary guidelines.",
    },
    {
      icon: Shield,
      title: "Genetic Health",
      description:
        "Our breeding cats are screened for breed-specific genetic conditions to ensure healthy offspring.",
    },
    {
      icon: Heart,
      title: "Lifetime Support",
      description:
        "We're here to answer questions and provide guidance throughout your kitten's life.",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
            Our Promise
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Health Guarantee
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            We stand behind the health of every kitten. Our comprehensive
            guarantee ensures you receive a healthy, happy companion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Health features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {healthFeatures.map((feature, index) => (
            <Card
              key={feature.title}
              variant="elevated"
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-sage-dark" />
              </div>
              <h3 className="font-heading font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-charcoal-light text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Guarantee details */}
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-terracotta" />
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                Guarantee Details
              </h2>
            </div>

            <div className="prose prose-charcoal max-w-none">
              <h3 className="font-heading text-lg font-semibold text-charcoal mt-6 mb-3">
                72-Hour Health Guarantee
              </h3>
              <p className="text-charcoal-light">
                You have 72 hours from the time of pickup or delivery to have
                your kitten examined by your own veterinarian. If a significant
                health issue is discovered that was present at the time of sale,
                we will work with you to resolve the situation.
              </p>

              <h3 className="font-heading text-lg font-semibold text-charcoal mt-6 mb-3">
                Genetic Health Warranty
              </h3>
              <p className="text-charcoal-light">
                We provide a 2-year genetic health warranty against serious
                hereditary defects. Our breeding program includes genetic testing
                and health screening to minimize the risk of inherited conditions.
              </p>

              <h3 className="font-heading text-lg font-semibold text-charcoal mt-6 mb-3">
                What&apos;s Included
              </h3>
              <ul className="list-disc list-inside text-charcoal-light space-y-2">
                <li>Complete health examination by licensed veterinarian</li>
                <li>Age-appropriate vaccinations</li>
                <li>Deworming treatment</li>
                <li>Microchip (if applicable)</li>
                <li>Health records and vaccination history</li>
                <li>Spay/neuter agreement or completion</li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-charcoal mt-6 mb-3">
                Your Responsibilities
              </h3>
              <ul className="list-disc list-inside text-charcoal-light space-y-2">
                <li>Schedule a vet visit within 72 hours of receiving your kitten</li>
                <li>Maintain proper nutrition and care</li>
                <li>Complete vaccination schedule as recommended</li>
                <li>Provide a safe, loving home environment</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-cream-dark">
              <p className="text-charcoal-light text-sm mb-4">
                Have questions about our health guarantee? We&apos;re happy to
                discuss the details with you.
              </p>
              <Link href="/contact">
                <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}










