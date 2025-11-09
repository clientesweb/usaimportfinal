"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { featuredProducts } from "@/data/featured-products"
import Link from "next/link"

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  const uniqueProductsMap = new Map()
  featuredProducts.forEach((product) => {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product)
    }
  })
  const uniqueProducts = Array.from(uniqueProductsMap.values())
  const limitedFeaturedProducts = uniqueProducts.slice(0, 10)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1536) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, limitedFeaturedProducts.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  const visibleProducts = limitedFeaturedProducts.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Título */}
        <h2 className="mb-8 md:mb-12 text-2xl md:text-4xl lg:text-5xl font-bold text-black">Destacados</h2>

        {/* Slider Container */}
        <div className="relative px-8 md:px-12">
          {/* Productos */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {visibleProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center text-center">
                {/* Imagen del producto */}
                <Link
                  href={`/productos/${product.slug}`}
                  className="w-full aspect-square mb-2 md:mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Nombre del producto */}
                <h3 className="text-xs md:text-base font-semibold text-black mb-1 md:mb-2 line-clamp-2 px-1">
                  {product.name}
                </h3>

                {/* Precio */}
                <p className="text-base md:text-xl font-bold text-black mb-2 md:mb-4">
                  ${product.price.toLocaleString("es-AR")}
                </p>

                {/* Botón Comprar */}
                <Link href={`/productos/${product.slug}`}>
                  <button className="bg-black text-white px-4 md:px-8 py-2 md:py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-xs md:text-base">
                    Comprar
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full hover:bg-gray-800 transition-colors duration-200 z-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Puntos indicadores */}
        <div className="flex justify-center gap-2 mt-6 md:mt-12">
          {Array.from({ length: Math.ceil(limitedFeaturedProducts.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-200 ${
                index === Math.floor(currentIndex / itemsPerView) ||
                (currentIndex === maxIndex && index === Math.ceil(limitedFeaturedProducts.length / itemsPerView) - 1)
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
