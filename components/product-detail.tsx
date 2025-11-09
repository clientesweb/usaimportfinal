"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Minus, Plus, Shield, RefreshCw } from "lucide-react"
import type { Product } from "@/data/featured-products"
import WhatsAppButton from "./whatsapp-button"
import { useCart } from "@/lib/cart-context"
import { getCategorySlug } from "@/lib/utils/category-slug"
import { featuredProducts } from "@/data/featured-products"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCart()
  const router = useRouter()

  const images = product.images || [product.image]
  const totalImages = images.length

  const categorySlug = getCategorySlug(product.category)
  const categoryUrl = `/categoria/${categorySlug}`

  const relatedProducts = featuredProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // Function to handle quantity decrease
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Function to handle quantity increase
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1)
  }

  // Function to handle adding to cart
  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      slug: product.slug,
    })
    router.push("/carrito")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-8">
          <Link href="/" className="text-gray-600 hover:text-black transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={categoryUrl} className="text-gray-600 hover:text-black transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-2 md:gap-4">
            {/* Thumbnails */}
            {totalImages > 1 && (
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 relative">
              {/* Image Counter */}
              {totalImages > 1 && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium shadow-md z-10">
                  {currentImageIndex + 1} / {totalImages}
                </div>
              )}

              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6">{product.name}</h1>

            {/* Price */}
            <div className="mb-4 md:mb-6">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                ${product.price.toLocaleString("es-AR")}
              </p>
            </div>

            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">Seleccionar unidades:</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <button
                onClick={handleQuantityDecrease}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-black"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-12 text-center text-black">{quantity}</span>
              <button
                onClick={handleQuantityIncrease}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-black"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 md:py-4 rounded-md font-semibold text-base md:text-lg hover:bg-gray-800 transition-colors mb-6 md:mb-8"
            >
              Agregar al carrito
            </button>

            {/* Info Sections */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-black">Compra protegida</p>
                  <p className="text-sm text-gray-600">Tus datos cuidados durante toda la compra.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-black">Cambios y devoluciones</p>
                  <p className="text-sm text-gray-600">Si no te gusta, podés cambiarlo por otro o devolverlo.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t pt-4 md:pt-6">
                <h2 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">Descripción</h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">También te puede interesar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-semibold text-black mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg md:text-xl font-bold text-black">
                      ${relatedProduct.price.toLocaleString("es-AR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
