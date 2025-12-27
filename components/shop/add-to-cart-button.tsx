"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { useCartStore } from "@/stores/cart";
import type { Kitten } from "@/types";

interface AddToCartButtonProps {
  kitten: Kitten;
  className?: string;
}

export function AddToCartButton({ kitten, className }: AddToCartButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { addItem, isInCart, openCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inCart = isMounted && isInCart(kitten.id);

  const handleClick = () => {
    if (kitten.availability !== "available") return;

    if (inCart) {
      openCart();
    } else {
      addItem(kitten);
    }
  };

  const isDisabled = kitten.availability !== "available";

  return (
    <Button
      size="lg"
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      variant={inCart ? "secondary" : "primary"}
      leftIcon={
        inCart ? (
          <Check className="w-5 h-5" />
        ) : (
          <ShoppingCart className="w-5 h-5" />
        )
      }
    >
      {isDisabled
        ? kitten.availability === "reserved"
          ? "Reserved"
          : "Already Adopted"
        : inCart
          ? "Added to Cart"
          : "Add to Cart"}
    </Button>
  );
}
