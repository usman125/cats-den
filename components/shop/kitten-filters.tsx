"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState, useCallback, useTransition } from "react";
import { Button, Input, Select, type SelectOption } from "@/components/ui";
import type { Breed, KittenFilters as KittenFiltersType } from "@/types";
import { cn } from "@/lib/utils";

interface KittenFiltersProps {
  breeds: Breed[];
  currentFilters: KittenFiltersType;
}

export function KittenFilters({ breeds, currentFilters }: KittenFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(currentFilters.search || "");

  const breedOptions: SelectOption[] = [
    { value: "", label: "All Breeds" },
    ...breeds.map((b) => ({ value: b.slug, label: b.name })),
  ];

  const genderOptions: SelectOption[] = [
    { value: "", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const availabilityOptions: SelectOption[] = [
    { value: "", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "sold", label: "Sold" },
  ];

  const priceOptions: SelectOption[] = [
    { value: "", label: "Any Price" },
    { value: "0-1000", label: "Under $1,000" },
    { value: "1000-1500", label: "$1,000 - $1,500" },
    { value: "1500-2000", label: "$1,500 - $2,000" },
    { value: "2000-99999", label: "$2,000+" },
  ];

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        if (key === "price") {
          const [min, max] = value.split("-");
          params.set("minPrice", min);
          params.set("maxPrice", max);
        } else {
          params.set(key, value);
        }
      } else {
        if (key === "price") {
          params.delete("minPrice");
          params.delete("maxPrice");
        } else {
          params.delete(key);
        }
      }

      // Reset to page 1 when filters change
      params.delete("page");

      startTransition(() => {
        router.push(`/kittens?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(() => {
    updateFilters("search", search);
  }, [search, updateFilters]);

  const clearFilters = useCallback(() => {
    setSearch("");
    startTransition(() => {
      router.push("/kittens");
    });
  }, [router]);

  const hasActiveFilters =
    currentFilters.breed ||
    currentFilters.gender ||
    currentFilters.availability ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.search;

  const getCurrentPriceValue = () => {
    if (currentFilters.minPrice && currentFilters.maxPrice) {
      return `${currentFilters.minPrice}-${currentFilters.maxPrice}`;
    }
    return "";
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Search
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Search kittens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Breed filter */}
      <Select
        label="Breed"
        options={breedOptions}
        value={currentFilters.breed || ""}
        onChange={(e) => updateFilters("breed", e.target.value)}
      />

      {/* Gender filter */}
      <Select
        label="Gender"
        options={genderOptions}
        value={currentFilters.gender || ""}
        onChange={(e) => updateFilters("gender", e.target.value)}
      />

      {/* Availability filter */}
      <Select
        label="Availability"
        options={availabilityOptions}
        value={currentFilters.availability || ""}
        onChange={(e) => updateFilters("availability", e.target.value)}
      />

      {/* Price filter */}
      <Select
        label="Price Range"
        options={priceOptions}
        value={getCurrentPriceValue()}
        onChange={(e) => updateFilters("price", e.target.value)}
      />

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="w-full"
          onClick={clearFilters}
          leftIcon={<X className="w-4 h-4" />}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
          leftIcon={<SlidersHorizontal className="w-4 h-4" />}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-terracotta text-white text-xs rounded-full">
              Active
            </span>
          )}
        </Button>
      </div>

      {/* Mobile filter panel */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <FilterContent />
        </div>
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden lg:block">
        <div
          className={cn(
            "bg-white rounded-2xl p-6 shadow-lg sticky top-24",
            isPending && "opacity-50 pointer-events-none"
          )}
        >
          <h2 className="font-heading text-lg font-semibold text-charcoal mb-6 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h2>
          <FilterContent />
        </div>
      </div>
    </>
  );
}










