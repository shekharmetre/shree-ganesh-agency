'use client'
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export function ShopppingCart() {
    
    return (

        <li className="ml-2 lg:ml-4 relative inline-block">
            <Link className="" href="#">
                <div className="absolute -top-4 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">{`iniside her`}</div>
                {/* {cart?.items.length} */}
                <ShoppingCartIcon />
            </Link>
        </li>
    )
}