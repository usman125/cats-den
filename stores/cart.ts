import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Kitten } from "@/types";

export interface CartItem {
  kitten: Kitten;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (kitten: Kitten) => void;
  removeItem: (kittenId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (kittenId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (kitten: Kitten) => {
        const { items } = get();

        // Check if already in cart (kittens are unique items)
        if (items.some((item) => item.kitten.id === kitten.id)) {
          return;
        }

        set({
          items: [
            ...items,
            {
              kitten,
              addedAt: new Date(),
            },
          ],
        });
      },

      removeItem: (kittenId: string) => {
        set({
          items: get().items.filter((item) => item.kitten.id !== kittenId),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.kitten.price, 0);
      },

      getItemCount: () => {
        return get().items.length;
      },

      isInCart: (kittenId: string) => {
        return get().items.some((item) => item.kitten.id === kittenId);
      },
    }),
    {
      name: "cats-den-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);










