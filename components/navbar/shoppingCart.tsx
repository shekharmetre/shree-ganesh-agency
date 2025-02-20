'use client'
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export function ShopppingCart() {
      const { cart, } = useAppSelector(
        (state: RootState) => state.carts
      );
    
    return (

        <li className="ml-2 lg:ml-4 relative inline-block">
            <Link className="" href="#">
                <div className="absolute -top-4 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">{cart?.items.length}</div>
                <ShoppingCartIcon />
            </Link>
        </li>
    )
}