// import { ProductItem } from "@/app/page";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ToastMessage } from "../ToastMessage";

// const calculateTotalPrice = (
//   totalPrice: number,
//   data: Medication,
//   quantity?: number
// ): number => {
//   return totalPrice + data.pricePerUnit * (quantity ? quantity : data.quantity);
// };

export type RemoveMedicationItem = {
  id: number;
};

export interface Medication {
  id: number;
  name: string;
  manufacturer: string;
  pricePerUnit: number;
  bulkDiscount: string;
  stock: string;
  expiryDate: string;
  quantity: number;
  category: string;
  offers: {
    type: string;
    description: string;
  };
}

export type MedicationCart = {
  items: Medication[];
  totalQuantities: number;
};

interface MedicationsState {
  cart: MedicationCart | null;
  totalPrice: number;
  action: "update" | "add" | "delete" | null;
}

// Define the initial state using that type
const initialState: MedicationsState = {
  cart: null,
  totalPrice: 0,
  action: null,
};

export const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Medication>) => {
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
        return ToastMessage("Success!", "Successfully Added To cart", "/cart");
      }

      const isItemInCart = state.cart.items.find((item) => action.payload.id === item.id);
      
      if (isItemInCart) {
        state.cart.items = state.cart.items.map((eachCartItem) =>
          eachCartItem.id === action.payload.id
            ? { ...eachCartItem, quantity: action.payload.quantity + eachCartItem.quantity }
            : eachCartItem
        );
        state.cart.totalQuantities += action.payload.quantity;
        state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
        return;
      }

      if (state.cart) {
        state.cart.items.push(action.payload);
        state.cart.totalQuantities += action.payload.quantity;
        state.totalPrice += action.payload.pricePerUnit * action.payload.quantity;
      }
    },
    removeMedicationItem: (state, action: PayloadAction<RemoveMedicationItem>) => {
      if (state.cart === null) return;
      
      state.cart.items = state.cart.items.filter((item) => item.id !== action.payload.id);
      state.cart.totalQuantities = state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.cart.items.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
    },
  },
});

export const { addToCart, removeMedicationItem } = medicationsSlice.actions;
export default medicationsSlice.reducer;
