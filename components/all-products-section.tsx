"use client"

import Link from "next/link"
import { accesoriosCelularProducts } from "@/data/products/accesorios-celular"
import { celularesProducts } from "@/data/products/celulares"
import { tvAudioProducts } from "@/data/products/tv-audio"

export default function AllProductsSection() {
  const curatedProducts = [
    // Accesorios para celular (4 productos)
    accesoriosCelularProducts.find((p) => p.slug === "fundas-silicone-case"),
    accesoriosCelularProducts.find((p) => p.slug === "cubre-camara-con-strass"),
    accesoriosCelularProducts.find((p) => p.slug === "battery-pack-7000mah-aaa"),
    accesoriosCelularProducts.find((p) => p.slug === "airpods-pro-replica"),

    // Smartphones (3 productos)
    celularesProducts.find((p) => p.slug === "redmi-a5-6-128gb"),
    celularesProducts.find((p) => p.slug === "redmi-15c-8-256gb"),
    celularesProducts.find((p) => p.slug === "poco-c75-8-256gb"),

    // Smart TVs (3 productos)
    tvAudioProducts.find((p) => p.slug === "tv-luo-43"),
    tvAudioProducts.find((p) => p.slug === "skyworth-32-google-tv"),
    tvAudioProducts.find((p) => p.slug === "mtek-smart-tv-50-android"),
  ].filter(Boolean)

  console.log("[v0] Curated products count:", curatedProducts.length)
  console.log(
    "[v0] Curated products details:",
    curatedProducts.map((p) => `ID:${p!.id} - ${p!.name} (${p!.category}) - $${p!.price}`),
  )

  return (
    <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center md:text-left">
            Todos Nuestros Productos
          </h2>
          <Link
            href="/productos"
            className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {curatedProducts.map((product) => (
            <div
              key={product!.id}
              className="flex flex-col items-center text-center bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={`/productos/${product!.slug}`}
                className="w-full aspect-square mb-2 md:mb-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <img
                  src={product!.image || "/placeholder.svg"}
                  alt={product!.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <h4 className="text-xs md:text-sm font-semibold text-black mb-1 md:mb-2 line-clamp-2 px-1">
                {product!.name}
              </h4>

              <p className="text-sm md:text-lg font-bold text-black mb-2 md:mb-3">
                ${product!.price.toLocaleString("es-AR")}
              </p>

              <Link href={`/productos/${product!.slug}`} className="w-full">
                <button className="w-full bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-xs md:text-sm">
                  Comprar
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
