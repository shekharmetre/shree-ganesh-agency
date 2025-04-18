// import { ProductItem } from "@/app/page";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ToastMessage } from "../ToastMessage";
import { CartItem } from "@/types/product.types";

// const calculateTotalPrice = (
//   totalPrice: number,
//   data: Medication,
//   pricePerUnit?: number
// ): number => {
//   return totalPrice + data.pricePerUnit * (pricePerUnit ? pricePerUnit : data.pricePerUnit);
// };

export type RemoveMedicationItem = {
  id: number;
};


export type MedicationCart = {
  items: CartItem[];
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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.pricePerUnit,
        };
        state.totalPrice += action.payload.pricePerUnit * action.payload.pricePerUnit;
        return ToastMessage("Success!", "Successfully Added To cart", "/cart");
      }

      const isItemInCart = state.cart.items.find((item) => action.payload.id === item.id);
      
      if (isItemInCart) {
        state.cart.items = state.cart.items.map((eachCartItem) =>
          eachCartItem.id === action.payload.id
            ? { ...eachCartItem, pricePerUnit: action.payload.pricePerUnit + eachCartItem.pricePerUnit }
            : eachCartItem
        );
        state.cart.totalQuantities += action.payload.pricePerUnit;
        state.totalPrice += action.payload.pricePerUnit * action.payload.pricePerUnit;
        return;
      }

      if (state.cart) {
        state.cart.items.push(action.payload);
        state.cart.totalQuantities += action.payload.pricePerUnit;
        state.totalPrice += action.payload.pricePerUnit * action.payload.pricePerUnit;
      }
    },
    removeMedicationItem: (state, action: PayloadAction<RemoveMedicationItem>) => {
      if (state.cart === null) return;
      
      state.cart.items = state.cart.items.filter((item) => item.id !== action.payload.id);
      state.cart.totalQuantities = state.cart.items.reduce((acc, item) => acc + item.pricePerUnit, 0);
      state.totalPrice = state.cart.items.reduce((acc, item) => acc + item.pricePerUnit * item.pricePerUnit, 0);
    },
  },
});

export const { addToCart, removeMedicationItem } = medicationsSlice.actions;
export default medicationsSlice.reducer;
