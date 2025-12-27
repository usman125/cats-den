"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, Shield, Lock, CreditCard } from "lucide-react";
import { Button, Input, Card, Select } from "@/components/ui";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  // Shipping info
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "US",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getTotal();
  const shipping = items.length > 0 ? 150 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Create order via API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            kittenId: item.kitten.id,
            kittenName: item.kitten.name,
            kittenBreed: item.kitten.breed.name,
            price: item.kitten.price,
            image: item.kitten.images[0]?.url,
          })),
          shippingAddress: {
            name: `${data.firstName} ${data.lastName}`,
            street: data.street,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            phone: data.phone,
          },
          subtotal,
          shipping,
          tax,
          total,
          notes: data.notes,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        router.push(`/order-confirmation/${order.orderNumber}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-cream-dark rounded w-48 mb-8" />
            <div className="h-96 bg-cream-dark rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to cart
          </Link>
          <h1 className="font-heading text-4xl font-bold text-charcoal">
            Checkout
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact information */}
              <Card variant="elevated">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <Input
                    label="Last Name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                  <Input
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>
              </Card>

              {/* Shipping address */}
              <Card variant="elevated">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    error={errors.street?.message}
                    {...register("street")}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                    <Input
                      label="State / Province"
                      error={errors.state?.message}
                      {...register("state")}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Postal Code"
                      error={errors.postalCode?.message}
                      {...register("postalCode")}
                    />
                    <Select
                      label="Country"
                      options={countryOptions}
                      error={errors.country?.message}
                      {...register("country")}
                    />
                  </div>
                </div>
              </Card>

              {/* Additional notes */}
              <Card variant="elevated">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  Additional Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Order Notes (optional)
                  </label>
                  <textarea
                    className="w-full h-24 px-4 py-3 bg-white border-2 border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 resize-none"
                    placeholder="Any special instructions for delivery or kitten care..."
                    {...register("notes")}
                  />
                </div>
              </Card>

              {/* Payment section (placeholder) */}
              <Card variant="elevated" className="bg-coral-light/30 border-coral">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-terracotta" />
                  <h2 className="font-heading text-xl font-semibold text-charcoal">
                    Payment
                  </h2>
                </div>
                <p className="text-charcoal-light mb-4">
                  Payment processing will be set up after order creation. You
                  will be contacted to complete payment securely.
                </p>
                <div className="flex items-center gap-2 text-sm text-charcoal-light">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure</span>
                </div>
              </Card>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-24">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.kitten.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.kitten.thumbnail?.url || item.kitten.images?.[0]?.url ||
                            "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop"
                          }
                          alt={item.kitten.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-charcoal truncate">
                          {item.kitten.name}
                        </p>
                        <p className="text-xs text-charcoal-light">
                          {item.kitten.breed.name}
                        </p>
                      </div>
                      <p className="font-medium text-charcoal">
                        {formatPrice(item.kitten.price)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-cream-dark space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Subtotal</span>
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
                    <span className="text-charcoal-light">Tax</span>
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

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Place Order
                </Button>

                {/* Guarantees */}
                <div className="mt-6 p-3 bg-sage/10 rounded-xl">
                  <div className="flex items-center gap-2 text-sage-dark text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Health guarantee included</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}





