import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "primereact/badge";
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  isNew?: boolean
  category: string
}


const newBrands: Product[] = [
  {
    id: 1,
    name: "Cetirizine 10mg",
    discount: 18,
    image: "/hero/cetirizine.png",
    price: 90,
    originalPrice: 110,
    category: "Antihistamine",
  },
  {
    id: 2,
    name: "Metformin 500mg",
    discount: 12,
    image: "/hero/metformin.png",
    price: 150,
    originalPrice: 170,
    category: "Diabetes Medication",
  },
  {
    id: 3,
    name: "Atorvastatin 20mg",
    discount: 8,
    image: "/hero/atorvastatin.png",
    price: 200,
    originalPrice: 220,
    category: "Cholesterol Medication",
  },
  {
    id: 4,
    name: "Salbutamol Inhaler",
    discount: 30,
    image: "/hero/salbutamol.png",
    price: 300,
    originalPrice: 430,
    category: "Asthma Medication",
  },
  {
    id: 5,
    name: "Shelcal 500 mg - Calcium Supplement",
    discount: 6,
    image: "/hero/shelcal.png",
    price: 135,
    originalPrice: 145,
    category: "Vitamins & Supplements",
  },
  {
    id: 6,
    name: "Karela Jamun Juice - Blood Sugar Support",
    discount: 6,
    image: "/hero/oil.png",
    price: 135,
    originalPrice: 145,
    category: "Ayurvedic & Herbal",
  },
  {
    id: 7,
    name: "Abzorb Dusting Powder - Antifungal Skin Care",
    discount: 6,
    image: "/hero/skincare-powder.png",
    price: 135,
    originalPrice: 145,
    category: "Skin Care",
  }
];


function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-[280px] h-[400px] flex flex-col justify-between">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-3">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-contain  w-full h-56  rounded-md mx-auto"
            width={5000}
            height={5000}
          />
          {product.discount && <Badge className="absolute top-2 left-2 text-black bg-red-500">{product.discount} sdfsd% OFF</Badge>}
          {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">New Brand</Badge>}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button size="sm" className="rounded-full">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductShowcase({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 space-x-4 scrollbar-hide">
            {products.map((product) => (
              <div key={product.id} className="snap-start flex-shrink-0">
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

