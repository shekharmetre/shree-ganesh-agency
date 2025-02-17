"use client";

import { addToCart } from "@/lib/features/carts/cartSlice";
import { ToastMessage } from "@/lib/features/ToastMessage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <button
      type="button"
      className="p-2 bg-blue-500 text-white rounded flex items-center gap-2"
      onClick={() => {
        dispatch(
          addToCart({
            id: data.id,
            name: data.title || "",
            srcUrl: data.srcUrl,
            price: data.price,
            attributes: [sizeSelection, colorSelection.name],
            discount: data.discount,
            quantity: data.quantity,
          })
        );
      }}
    >
      <ShoppingCartIcon />
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
