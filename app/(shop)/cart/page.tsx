"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, clearCart, getTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-cream-dark rounded w-48 mb-8" />
            <div className="h-64 bg-cream-dark rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = items.length > 0 ? 150 : 0; // Flat shipping rate
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/kittens"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Continue shopping
          </Link>
          <h1 className="font-heading text-4xl font-bold text-charcoal">
            Your Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          /* Empty cart */
          <Card variant="elevated" className="text-center py-16">
            <div className="w-24 h-24 bg-coral-light rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-terracotta" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-2">
              Your cart is empty
            </h2>
            <p className="text-charcoal-light mb-6">
              Looks like you haven&apos;t added any kittens yet. Let&apos;s find
              your perfect companion!
            </p>
            <Link href="/kittens">
              <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Kittens
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.kitten.id} variant="elevated" padding="none">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <Link
                      href={`/kitten/${item.kitten.slug}`}
                      className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={
                          item.kitten.thumbnail?.url || item.kitten.images?.[0]?.url || "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop"
                        }
                        alt={item.kitten.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/kitten/${item.kitten.slug}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        <h3 className="font-heading text-lg font-semibold text-charcoal">
                          {item.kitten.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-charcoal-light">
                        {item.kitten.breed.name} •{" "}
                        {item.kitten.gender === "male" ? "Male" : "Female"} •{" "}
                        {item.kitten.age}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.kitten.vaccinated && (
                          <span className="text-xs px-2 py-0.5 bg-sage/20 text-sage-dark rounded-full">
                            Vaccinated
                          </span>
                        )}
                        {item.kitten.microchipped && (
                          <span className="text-xs px-2 py-0.5 bg-sage/20 text-sage-dark rounded-full">
                            Microchipped
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and remove */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-heading text-xl font-bold text-terracotta">
                        {formatPrice(item.kitten.price)}
                      </p>
                      <button
                        onClick={() => removeItem(item.kitten.id)}
                        className="p-2 text-charcoal-light hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Clear cart */}
              <div className="flex justify-end">
                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-24">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">
                      Subtotal ({items.length} kitten
                      {items.length > 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-charcoal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Shipping</span>
                    <span className="font-medium text-charcoal">
                      {formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Tax (8%)</span>
                    <span className="font-medium text-charcoal">
                      {formatPrice(tax)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-cream-dark">
                    <div className="flex justify-between">
                      <span className="font-heading font-semibold text-charcoal">
                        Total
                      </span>
                      <span className="font-heading text-xl font-bold text-terracotta">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button
                    className="w-full"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-charcoal-light text-center mt-4">
                  By proceeding, you agree to our{" "}
                  <Link href="/terms" className="text-terracotta hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/health-guarantee"
                    className="text-terracotta hover:underline"
                  >
                    Health Guarantee
                  </Link>
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





