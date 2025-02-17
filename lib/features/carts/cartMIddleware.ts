import { createListenerMiddleware } from "@reduxjs/toolkit";
import { ToastMessage } from "../ToastMessage";
import { addToCart, removeCartItem, remove } from "./cartSlice";

const cartListenerMiddleware = createListenerMiddleware();

// Listen for `addToCart`
cartListenerMiddleware.startListening({
  actionCreator: addToCart,
  effect: async (action) => {
    ToastMessage("Success!", "Item added to cart!", "/cart");
  },
});

// Listen for `removeCartItem`
cartListenerMiddleware.startListening({
  actionCreator: removeCartItem,
  effect: async (action) => {
    ToastMessage("Removed", "Item removed from cart.");
  },
});

// Listen for `remove`
cartListenerMiddleware.startListening({
  actionCreator: remove,
  effect: async (action) => {
    ToastMessage("Deleted", "Item completely removed from cart.");
  },
});

export { cartListenerMiddleware };
