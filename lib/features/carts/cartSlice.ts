import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ToastMessage } from "../ToastMessage";
import { Discount } from "@/types/product.types";  // Assuming Discount type is the same
import { compareArrays } from "@/lib/utils"; // Assuming compareArrays is necessary

// Calculate total price with discounts, similar to the `calcAdjustedTotalPrice` function in `cartsSlice`
const calculateTotalPrice = (
  totalPrice: number,
  data: CartItem,  // Changed type to `CartItem` for consistency
  quantity?: number
): number => {
  return totalPrice + data.pricePerUnit * (quantity ? quantity : data.quantity);
};

// Types for cart management
export type RemoveCartItem = {
  id: number;
};

export interface CartItem {
  id: number;
  name: string;
  manufacturer: string;
  pricePerUnit: number;
  bulkDiscount: string;
  stock: string;
  expiryDate: string;
  quantity: number;
  category: string;
  discount?: Discount;
}

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;  // Adjusted total for any discount or offer
  action: "update" | "add" | "delete" | null;
}

// Initial state for the cart
const initialState: CartState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
        state.adjustedTotalPrice += calculateTotalPrice(state.totalPrice, action.payload);
        return ToastMessage("Success!", "Successfully Added To cart", "/cart");
      }

      // Check if item is already in cart
      const isItemInCart = state.cart.items.find((item) => action.payload.id === item.id);

      if (isItemInCart) {
        // Update the quantity of the existing item
        state.cart.items = state.cart.items.map((eachCartItem) =>
          eachCartItem.id === action.payload.id
            ? { ...eachCartItem, quantity: eachCartItem.quantity + action.payload.quantity }
            : eachCartItem
        );
        state.cart.totalQuantities += action.payload.quantity;
        state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
        state.adjustedTotalPrice += calculateTotalPrice(state.totalPrice, action.payload);
        return;
      }

      // Add the new item if it's not in the cart
      state.cart.items.push(action.payload);
      state.cart.totalQuantities += action.payload.quantity;
      state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
      state.adjustedTotalPrice += calculateTotalPrice(state.totalPrice, action.payload);
    },
    
    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (state.cart === null) return;

      // Check if item is in cart
      const isItemInCart = state.cart.items.find((item) =>
        item.id === action.payload.id 
      );

      if (isItemInCart) {
        // Remove the item from the cart
        state.cart.items = state.cart.items.filter((item) =>
          item.id !== action.payload.id || !compareArrays(item.id as any, action.payload.id as any)
        );
        state.cart.totalQuantities = state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalPrice = state.cart.items.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
        state.adjustedTotalPrice = state.cart.items.reduce((acc, item) => acc + calculateTotalPrice(acc, item), 0);
      }
    },
    
    // Remove a specific amount of items from the cart (like for quantity decrement)
    remove: (state, action: PayloadAction<RemoveCartItem & { quantity: number }>) => {
      if (!state.cart) return;

      // Check if the item is in the cart
      const isItemInCart = state.cart.items.find((item) => item.id === action.payload.id);
      if (!isItemInCart) return;

      // Decrease quantity or remove completely
      state.cart.items = state.cart.items.filter((item) =>
        item.id === action.payload.id ? item.quantity > action.payload.quantity : true
      );
      state.cart.totalQuantities -= action.payload.quantity;
      state.totalPrice -= isItemInCart.pricePerUnit * action.payload.quantity;
      state.adjustedTotalPrice -= calculateTotalPrice(state.totalPrice, isItemInCart, action.payload.quantity);
    },
  },
});

// Export the actions for use in your components
export const { addToCart, removeCartItem, remove } = cartSlice.actions;
export default cartSlice.reducer;
