"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CartItem } from "@/types/product.types"


interface ProductGalleryProps {
  product: CartItem
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)

  // For a real implementation, we would have multiple images
  const images = React.useMemo(() => [
    product.image,
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Side`,
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Back`,
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Package`,
  ], [product.image, product.name])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main image with zoom */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-sm"
              aria-label="Enlarge image"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="aspect-square relative">
              <Image
                src={images[activeImage] || "/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Back"}
                alt={`Enlarged view of ${product.name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>

        <div
          className="relative h-full w-full"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          aria-label="Product image zoom area"
        >
          <Image
            src={images[activeImage] || "/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Back"}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />

          {/* Zoom overlay */}
          {showZoom && (
            <div
              className="absolute inset-0 bg-no-repeat pointer-events-none"
              style={{
                backgroundImage: `url(${images[activeImage]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "200%",
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Discount badge */}
        {product.perecentage && product.perecentage > 0 && (
          <div className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {product.perecentage}% OFF
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                activeImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1} of ${product.name}`}
              aria-current={activeImage === index ? "true" : "false"}
            >
              <Image
              src={image || "/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}-Back"}
                // src={image}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}