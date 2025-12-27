import Link from "next/link";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { orderNumber } = await params;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card variant="elevated" className="text-center animate-scale-in">
            {/* Success icon */}
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-sage-dark" />
            </div>

            <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
              Order Confirmed!
            </h1>
            <p className="text-charcoal-light mb-6">
              Thank you for your order. We&apos;re excited to help you welcome
              your new furry friend home!
            </p>

            {/* Order number */}
            <div className="bg-cream rounded-xl p-4 mb-8">
              <p className="text-sm text-charcoal-light mb-1">Order Number</p>
              <p className="font-heading text-xl font-bold text-terracotta">
                {orderNumber}
              </p>
            </div>

            {/* Next steps */}
            <div className="text-left space-y-4 mb-8">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                What happens next?
              </h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-coral-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">
                      Confirmation Email
                    </p>
                    <p className="text-sm text-charcoal-light">
                      You&apos;ll receive an email with your order details and
                      payment instructions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-coral-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">
                      Preparation & Delivery
                    </p>
                    <p className="text-sm text-charcoal-light">
                      We&apos;ll coordinate with you for the best delivery time and
                      prepare your kitten&apos;s starter kit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account/orders">
                <Button variant="outline">View Your Orders</Button>
              </Link>
              <Link href="/kittens">
                <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>

          {/* Support info */}
          <p className="text-center text-charcoal-light mt-8">
            Questions about your order?{" "}
            <Link href="/contact" className="text-terracotta hover:underline">
              Contact us
            </Link>{" "}
            and we&apos;ll be happy to help.
          </p>
        </div>
      </div>
    </div>
  );
}










