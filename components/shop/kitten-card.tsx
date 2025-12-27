"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import type { Kitten } from "@/types";
import { cn } from "@/lib/utils";

interface KittenCardProps {
  kitten: Kitten;
  priority?: boolean;
}

export function KittenCard({ kitten, priority = false }: KittenCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { addItem, isInCart } = useCartStore();

  // Prevent hydration mismatch by only checking cart after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inCart = isMounted && isInCart(kitten.id);

  // Map availability values to badge styles (case-insensitive)
  const availabilityMap: Record<string, { variant: "success" | "warning" | "danger" | "default"; label: string }> = {
    available: { variant: "success", label: "Available" },
    reserved: { variant: "warning", label: "Reserved" },
    sold: { variant: "danger", label: "Sold" },
  };
  
  // Normalize the availability value (lowercase, handle null/undefined)
  const normalizedAvailability = (kitten.availability || "").toLowerCase().trim();
  const availabilityBadge = availabilityMap[normalizedAvailability] || {
    variant: "default" as const,
    label: kitten.availability || "Unknown",
  };

  // Check if kitten is available for purchase
  const isAvailable = normalizedAvailability === "available";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable && !inCart) {
      addItem(kitten);
    }
  };

  return (
    <Link href={`/kitten/${kitten.slug}`}>
      <Card
        variant="elevated"
        padding="none"
        hoverable
        className="group overflow-hidden"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={kitten.thumbnail?.url || kitten.images?.[0]?.url || "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=450&fit=crop"}
            alt={kitten.thumbnail?.alt || kitten.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge variant={availabilityBadge.variant}>
              {availabilityBadge.label}
            </Badge>
            {kitten.featured && (
              <Badge variant="outline" className="bg-white/90">
                ⭐ Featured
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-terracotta hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Quick add button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Button
              variant={inCart ? "secondary" : "primary"}
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!isAvailable}
              leftIcon={
                inCart ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )
              }
            >
              {inCart
                ? "In Cart"
                : isAvailable
                  ? "Add to Cart"
                  : availabilityBadge.label}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Breed tag */}
          <span className="text-xs font-medium text-terracotta uppercase tracking-wide">
            {kitten.breed.name}
          </span>

          {/* Name and gender */}
          <div className="flex items-center gap-2 mt-1">
            <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors">
              {kitten.name}
            </h3>
            <span
              className={cn(
                "text-sm",
                kitten.gender === "male" ? "text-blue-500" : "text-pink-500"
              )}
            >
              {kitten.gender === "male" ? "♂" : "♀"}
            </span>
          </div>

          {/* Details */}
          <p className="text-sm text-charcoal-light mt-1">
            {kitten.age} old
            {kitten.vaccinated && " • Vaccinated"}
            {kitten.microchipped && " • Microchipped"}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
            <span className="font-heading text-xl font-bold text-terracotta">
              {formatPrice(kitten.price)}
            </span>
            <span className="text-xs text-charcoal-light">
              Includes health guarantee
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
