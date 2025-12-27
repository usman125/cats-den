import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cat's Den. Have questions about our kittens, breeds, or adoption process? We're here to help!",
  openGraph: {
    title: "Contact Us | Cat's Den",
    description:
      "Have questions about our kittens or the adoption process? Contact Cat's Den today.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Contact Us
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Have questions about our kittens or the adoption process? We&apos;d
            love to hear from you!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <Card variant="elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@catsden.com"
                    className="text-charcoal-light hover:text-terracotta transition-colors"
                  >
                    hello@catsden.com
                  </a>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className="text-charcoal-light hover:text-terracotta transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Location
                  </h3>
                  <p className="text-charcoal-light">
                    123 Kitten Lane
                    <br />
                    Purrville, CA 90210
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="gradient" className="bg-sage/20 border-sage">
              <h3 className="font-heading font-semibold text-charcoal mb-2">
                Response Time
              </h3>
              <p className="text-sm text-charcoal-light">
                We typically respond within 24 hours. For urgent inquiries,
                please call us directly.
              </p>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
