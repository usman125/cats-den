"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card variant="gradient" className="h-full">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-gold text-gold"
                : "fill-cream-dark text-cream-dark"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-charcoal mb-6 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-cream-dark">
        {testimonial.customerImage ? (
          <Image
            src={testimonial.customerImage.url}
            alt={testimonial.customerName}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-coral-light flex items-center justify-center">
            <span className="text-lg font-semibold text-terracotta">
              {testimonial.customerName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium text-charcoal">{testimonial.customerName}</p>
          {testimonial.kittenPurchased && (
            <p className="text-sm text-charcoal-light">
              Adopted a {testimonial.kittenPurchased}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}










