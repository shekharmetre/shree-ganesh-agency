// store/cartStore.ts
import { CartItem } from '@/types/product.types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  cart: { items: CartItem[]; totalQuantities: number } | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
  addToCart: (item: CartItem) => void;
  removeCartItem: (id: number) => void;
  remove: (payload: { id: number; pricePerUnit: number }) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      totalPrice: 0,
      adjustedTotalPrice: 0,
      action: null,

      // Add item to cart
      addToCart: (item) => {
        const state = get();
        if (!state.cart) {
          set({
            cart: { items: [item], totalQuantities: item.pricePerUnit || 1 },
            totalPrice: item.pricePerUnit * (item.pricePerUnit || 1),
            adjustedTotalPrice: item.pricePerUnit * (item.pricePerUnit || 1),
            action: "add",
          });
          return;
        }

        const existingItem = state.cart.items.find((i) => i.id === item.id);
        if (existingItem) {
          const updatedItems = state.cart.items.map((i) =>
            i.id === item.id
              ? { ...i, pricePerUnit: (i.pricePerUnit || 1) + (item.pricePerUnit || 1) }
              : i
          );
          set({
            cart: {
              items: updatedItems,
              totalQuantities: state.cart.totalQuantities + (item.pricePerUnit || 1),
            },
            totalPrice: state.totalPrice + item.pricePerUnit * (item.pricePerUnit || 1),
            adjustedTotalPrice: state.adjustedTotalPrice + item.pricePerUnit * (item.pricePerUnit || 1),
            action: "update",
          });
        } else {
          set({
            cart: {
              items: [...state.cart.items, item],
              totalQuantities: state.cart.totalQuantities + (item.pricePerUnit || 1),
            },
            totalPrice: state.totalPrice + item.pricePerUnit * (item.pricePerUnit || 1),
            adjustedTotalPrice: state.adjustedTotalPrice + item.pricePerUnit * (item.pricePerUnit || 1),
            action: "add",
          });
        }
      },

      // Remove item completely
      removeCartItem: (id) => {
        const state = get();
        if (!state.cart) return;

        const itemToRemove = state.cart.items.find((i) => i.id === id);
        if (!itemToRemove) return;

        const updatedItems = state.cart.items.filter((i) => i.id !== id);
        const removedpricePerUnit = itemToRemove.pricePerUnit || 1;

        set({
          cart: {
            items: updatedItems,
            totalQuantities: state.cart.totalQuantities - removedpricePerUnit,
          },
          totalPrice: state.totalPrice - itemToRemove.pricePerUnit * removedpricePerUnit,
          adjustedTotalPrice: state.adjustedTotalPrice - itemToRemove.pricePerUnit * removedpricePerUnit,
          action: "delete",
        });
      },

      // Remove a specific pricePerUnit
      remove: ({ id, pricePerUnit }) => {
        const state = get();
        if (!state.cart) return;

        const itemToUpdate = state.cart.items.find((i) => i.id === id);
        if (!itemToUpdate) return;

        const newpricePerUnit = Math.max(0, (itemToUpdate.pricePerUnit || 1) - pricePerUnit);
        const pricePerUnitRemoved = (itemToUpdate.pricePerUnit || 1) - newpricePerUnit;

        if (newpricePerUnit <= 0) {
          get().removeCartItem(id);
          return;
        }

        const updatedItems = state.cart.items.map((i) =>
          i.id === id ? { ...i, pricePerUnit: newpricePerUnit } : i
        );

        set({
          cart: {
            items: updatedItems,
            totalQuantities: state.cart.totalQuantities - pricePerUnitRemoved,
          },
          totalPrice: state.totalPrice - itemToUpdate.pricePerUnit * pricePerUnitRemoved,
          adjustedTotalPrice: state.adjustedTotalPrice - itemToUpdate.pricePerUnit * pricePerUnitRemoved,
          action: "update",
        });
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage), // Properly typed storage
    }
  )
);