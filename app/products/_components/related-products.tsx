import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "primereact/badge"
import { CartItem } from "@/types/product.types"

interface RelatedProductsProps {
  products: CartItem[] | null
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products &&  products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative aspect-square">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </Link>
            {product.isNew && <Badge className="absolute left-2 top-2">New</Badge>}
            {product.perecentage && product.perecentage > 0 && (
              <Badge className="absolute right-2 top-2">
                {product.perecentage}% OFF
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="mb-2 text-sm text-muted-foreground">{product.manufacturer}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(24)</span>
            </div>
            <div className="flex items-center gap-2">
              {product.perecentage && product.perecentage > 0 ? (
                <>
                  <span className="font-bold">
                    ₹{(product.pricePerUnit - product.pricePerUnit * (product.perecentage / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.pricePerUnit.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-bold">₹{product.pricePerUnit.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
