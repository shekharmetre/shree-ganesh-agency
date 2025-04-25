'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "primereact/badge";
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { CartItem } from "@/types/product.types";
import { addToCart } from "@/lib/features/medi-cart/medicartSlice";
import Link from "next/link";
import { newBrands } from "@/public/assets/data";


function ProductCard({ product }: { product: CartItem }) {
  return (
    <Card className="w-[280px] h-[400px] flex flex-col justify-between">
      <CardContent className="p-4 cursor-pointer">
        <div className="aspect-square relative mb-3">
          <Link href={`/products/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-contain  w-full h-56  rounded-md mx-auto"
            width={5000}
            height={5000}
          />
          </Link>
          {product.offers?.type && <Badge className="absolute top-2 left-2 text-black bg-red-500">{product.perecentage} sdfsd% OFF</Badge>}
          {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">New Brand</Badge>}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">${product.pricePerUnit.toFixed(2)}</span>
              {product.pricePerUnit && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${product.pricePerUnit.toFixed(2)}
                </span>
              )}
            </div>
            <Button size="sm" className="rounded-full" onClick={()=>addToCart(product)}>
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductShowcase({ title, products }: { title: string; products: CartItem[] }) {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 space-x-4 scrollbar-hide">
            {products.map((product) => (
              <div key={product.name} className="snap-start flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProductShowcases() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ProductShowcase title="Best Offers" products={newBrands} />
      </div>
    </div>
  )
}

