"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Heart,
  Info,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"
import { ProductGallery } from "../_components/product-gallery"
import { RelatedProducts } from "../_components/related-products"
import { PrescriptionUpload } from "../_components/prescription-upload"
import { ProductReviews } from "../_components/products-reviews"
import { Badge } from "primereact/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { CartItem } from "@/types/product.types"
import { newBrands } from "@/public/assets/data"
import { useCartStore } from "@/lib/hooks/cartStore"


// Additional product details for the selected product
const productDetails = {
  description:
    "This medication is used to treat allergy symptoms such as itching, runny nose, watery eyes, and sneezing. It works by blocking a certain natural substance (histamine) that your body makes during an allergic reaction.",
  dosage:
    "For adults and children 6 years and older: Take 1 tablet (10 mg) once daily. Do not take more than 1 tablet in 24 hours.",
  sideEffects:
    "Drowsiness, dry mouth, headache, fatigue, and stomach pain may occur. If any of these effects persist or worsen, tell your doctor or pharmacist promptly.",
  precautions:
    "Before taking cetirizine, tell your doctor or pharmacist if you are allergic to it; or to hydroxyzine; or if you have any other allergies.",
  storage:
    "Store at room temperature away from light and moisture. Do not store in the bathroom. Keep all medications away from children and pets.",
  ingredients: [
    "Cetirizine Hydrochloride 10mg",
    "Lactose",
    "Microcrystalline Cellulose",
    "Colloidal Silicon Dioxide",
    "Magnesium Stearate",
  ],
  packaging: "Blister pack of 10 tablets",
  prescriptionRequired: false,
  reviews: {
    average: 4.5,
    count: 128,
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<CartItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const { cart, addToCart } = useCartStore();

  useEffect(() => {
    // Find the product based on the ID from the URL
    const id = Number(params.id)
    const foundProduct = newBrands.find((p) => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // If no product is found, default to the first one
      setProduct(newBrands[0])
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    )
  }

  // Calculate discounted price
  const discountPercentage = product.perecentage || 0
  const originalPrice = product.pricePerUnit
  const discountedPrice = originalPrice - originalPrice * (discountPercentage / 100)

  // Check if expiry date is within 6 months
  const expiryDate = new Date(`01/${product.expiryDate}`)
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
  const isExpiringSoon = expiryDate <= sixMonthsFromNow

  // Get related products (same category)
  const relatedProducts = newBrands.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/products/category/${product.category}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </div>

      {/* Back button for mobile */}
      <Link href="/products" className="inline-flex items-center gap-1 mb-4 md:hidden">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Gallery */}
        <div className="sticky top-4">
          <ProductGallery product={product} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge  className="bg-green-50 text-green-700 border-green-200">
              {product.category}
            </Badge>
            {product.isNew && <Badge className="bg-primary">New</Badge>}
            {product.stock === "Limited Stock" && <Badge>Limited Stock</Badge>}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(productDetails.reviews.average)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {productDetails.reviews.average} ({productDetails.reviews.count} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold">₹{discountedPrice.toFixed(2)}</span>
            {discountPercentage > 0 && (
              <>
                <span className="text-muted-foreground line-through">₹{originalPrice.toFixed(2)}</span>
                <Badge className="bg-green-600">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium">Manufacturer:</span>
            <span className="text-sm">{product.manufacturer}</span>
          </div>

          {/* Offer banner */}
          {product.offers && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6 flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                <span className="font-medium">Special Offer:</span> {product.offers.description}
              </p>
            </div>
          )}

          {/* Stock and expiry info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  product.stock === "In Stock"
                    ? "bg-green-500"
                    : product.stock === "Limited Stock"
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
              />
              <span className="text-sm">{product.stock}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className={`h-4 w-4 ${isExpiringSoon ? "text-amber-500" : "text-green-500"}`} />
              <span className="text-sm">
                Expiry: {product.expiryDate}
                {isExpiringSoon && <span className="text-amber-600 ml-1">(Expiring soon)</span>}
              </span>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button className="flex-1 sm:flex-none" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" onClick={()=>addToCart(product)} />
              Add to Cart
            </Button>

            {productDetails.prescriptionRequired && (
              <Button  className="flex-1 sm:flex-none" size="lg">
                Upload Prescription
              </Button>
            )}

            <Button  size="icon" className="h-11 w-11" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            <Button  size="icon" className="h-11 w-11">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Delivery info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="font-medium mb-3">Delivery Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Free delivery on orders above ₹500</p>
                  <p className="text-xs text-muted-foreground">Typically delivered in 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">100% Genuine Products</p>
                  <p className="text-xs text-muted-foreground">
                    All our products are sourced directly from authorized distributors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product details tabs */}
          <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="dosage">Dosage</TabsTrigger>
              <TabsTrigger value="sideEffects">Side Effects</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-sm leading-relaxed">
              <p>{productDetails.description}</p>
            </TabsContent>
            <TabsContent value="dosage" className="text-sm leading-relaxed">
              <p>{productDetails.dosage}</p>
            </TabsContent>
            <TabsContent value="sideEffects" className="text-sm leading-relaxed">
              <p>{productDetails.sideEffects}</p>
            </TabsContent>
            <TabsContent value="details" className="text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Ingredients</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {productDetails.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Storage</h4>
                  <p>{productDetails.storage}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Packaging</h4>
                  <p>{productDetails.packaging}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Prescription Required</h4>
                  <div className="flex items-center gap-2">
                    {productDetails.prescriptionRequired ? (
                      <>
                        <Check className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">Yes</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">No</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Prescription upload section */}
      {productDetails.prescriptionRequired && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upload Prescription</h2>
          <PrescriptionUpload />
        </div>
      )}

      {/* Product reviews */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <ProductReviews productId={product.id} reviews={productDetails.reviews} />
      </div>

      {/* Related products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <RelatedProducts products={newBrands} />
      </div>
    </div>
  )
}
