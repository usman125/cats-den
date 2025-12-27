import { Metadata } from "next";
import { Truck, Clock, MapPin, Shield, Package, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "Learn about our safe and stress-free kitten delivery options. We ensure your new companion arrives healthy and happy.",
};

export default function ShippingPage() {
  const shippingOptions = [
    {
      icon: Truck,
      title: "Ground Transport",
      price: "$150 - $300",
      description:
        "Professional pet transport service via climate-controlled vehicle. Available within 500 miles.",
      features: [
        "Climate-controlled vehicle",
        "Regular rest stops",
        "Live updates during transit",
        "Direct delivery to your home",
      ],
    },
    {
      icon: Package,
      title: "Air Shipping",
      price: "$350 - $500",
      description:
        "Safe air transport in an airline-approved carrier with all necessary documentation.",
      features: [
        "Airline-approved carrier included",
        "Health certificate provided",
        "Flight nanny available",
        "Airport pickup coordination",
      ],
    },
    {
      icon: MapPin,
      title: "In-Person Pickup",
      price: "Free",
      description:
        "Visit us to meet your kitten and take them home the same day. Tour our facility!",
      features: [
        "Meet the kitten in person",
        "Tour our cattery",
        "Receive care instructions",
        "Starter kit included",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
            Delivery Options
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Shipping Information
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            We ensure safe, stress-free delivery of your new family member
            through trusted transport methods.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Shipping options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {shippingOptions.map((option, index) => (
            <Card
              key={option.title}
              variant="elevated"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-coral-light rounded-xl flex items-center justify-center mb-4">
                <option.icon className="w-7 h-7 text-terracotta" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-charcoal mb-1">
                {option.title}
              </h2>
              <p className="text-2xl font-bold text-terracotta mb-3">
                {option.price}
              </p>
              <p className="text-charcoal-light text-sm mb-4">
                {option.description}
              </p>
              <ul className="space-y-2">
                {option.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-charcoal"
                  >
                    <CheckCircle className="w-4 h-4 text-sage-dark flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Important info */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 text-center">
            Important Information
          </h2>

          <div className="space-y-6">
            <Card variant="gradient">
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-terracotta flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-2">
                    Timing
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    Kittens are typically ready for their new homes at 12-14 weeks
                    of age. We&apos;ll coordinate delivery timing with you to
                    ensure a smooth transition.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="gradient">
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-terracotta flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-2">
                    Safety First
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    All transport methods are carefully selected for the safety
                    and comfort of your kitten. We never ship during extreme
                    weather conditions.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="gradient">
              <div className="flex gap-4">
                <Package className="w-6 h-6 text-terracotta flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-2">
                    What&apos;s Included
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    Every kitten arrives with a starter kit including food
                    samples, health records, vaccination certificates, and a
                    comfort item with familiar scents.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}










