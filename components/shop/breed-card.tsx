"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCharacteristics } from "@/types";
import type { Breed } from "@/types";

interface BreedCardProps {
  breed: Breed;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
}

export function BreedCard({
  breed,
  size = "md",
  showDescription = true,
}: BreedCardProps) {
  const sizes = {
    sm: {
      container: "aspect-square",
      image: "h-32",
      title: "text-base",
    },
    md: {
      container: "aspect-[4/5]",
      image: "h-48",
      title: "text-lg",
    },
    lg: {
      container: "aspect-[3/4]",
      image: "h-64",
      title: "text-xl",
    },
  };

  return (
    <Link href={`/breeds/${breed.slug}`} className="group block">
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          sizes[size].container
        )}
      >
        {/* Background image */}
        {breed.image?.url ? (
          <Image
            src={breed.image.url}
            alt={breed.image.alt || breed.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-coral-light to-terracotta/40" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <h3
            className={cn(
              "font-heading font-bold text-white",
              sizes[size].title
            )}
          >
            {breed.name}
          </h3>

          {showDescription && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {breed.description}
            </p>
          )}

          {/* Characteristics tags */}
          {getCharacteristics(breed.characteristics).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {getCharacteristics(breed.characteristics).slice(0, 3).map((char) => (
                <span
                  key={char}
                  className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                >
                  {char}
                </span>
              ))}
            </div>
          )}

          {/* Arrow */}
          <div className="mt-3 flex items-center gap-1 text-terracotta-light group-hover:text-terracotta transition-colors">
            <span className="text-sm font-medium">View breed</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}





