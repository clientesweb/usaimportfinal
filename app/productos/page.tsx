"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { allProducts } from "@/data/all-products"
import { allCategories } from "@/lib/categories"
import { slugify } from "@/lib/utils/slugify"
import { MessageCircle, Filter, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("buscar")?.toLowerCase() || ""

  const filteredProductsBySearch = useMemo(() => {
    if (!searchQuery) return allProducts
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        (product.description?.toLowerCase() || "").includes(searchQuery),
    )
  }, [searchQuery])

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredProductsBySearch.forEach((product) => {
      const slug = slugify(product.category)
      counts[slug] = (counts[slug] || 0) + 1
    })
    return counts
  }, [filteredProductsBySearch])

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return filteredProductsBySearch
    return filteredProductsBySearch.filter((product) => slugify(product.category) === selectedCategory)
  }, [selectedCategory, filteredProductsBySearch])

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    setMobileFilterOpen(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {searchQuery
                ? `Resultados de búsqueda: "${searchQuery}"`
                : selectedCategory
                  ? allCategories.find((c) => slugify(c.name) === selectedCategory)?.name
                  : "Todos los Productos"}
            </h1>
            <p className="text-gray-600">
              Descubre nuestra selección completa de productos importados directamente desde Estados Unidos
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900"
              >
                <Filter className="w-4 h-4" />
                Filtrar por categoría
                {selectedCategory && (
                  <span className="ml-2 px-2 py-0.5 bg-black text-white text-xs rounded-full">1</span>
                )}
              </Button>
            </div>

            {/* Sidebar Filter - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Categorías</h2>
                <div className="space-y-2">
                  {/* All Products Option */}
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      !selectedCategory ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span>Todas las categorías</span>
                    <span className={`text-sm ${!selectedCategory ? "text-white/80" : "text-gray-500"}`}>
                      {filteredProductsBySearch.length}
                    </span>
                  </button>

                  {/* Category Options */}
                  {allCategories.map((category) => {
                    const categorySlug = slugify(category.name)
                    const count = categoryCounts[categorySlug] || 0
                    const isActive = selectedCategory === categorySlug

                    if (count === 0) return null

                    return (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryClick(categorySlug)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                          isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        <span className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Mobile Filter Overlay */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFilterOpen(false)}>
                <div
                  className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Filtrar por categoría</h2>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {/* All Products Option */}
                      <button
                        onClick={() => handleCategoryClick(null)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                          !selectedCategory ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span>Todas las categorías</span>
                        <span className={`text-sm ${!selectedCategory ? "text-white/80" : "text-gray-500"}`}>
                          {filteredProductsBySearch.length}
                        </span>
                      </button>

                      {/* Category Options */}
                      {allCategories.map((category) => {
                        const categorySlug = slugify(category.name)
                        const count = categoryCounts[categorySlug] || 0
                        const isActive = selectedCategory === categorySlug

                        if (count === 0) return null

                        return (
                          <button
                            key={category.name}
                            onClick={() => handleCategoryClick(categorySlug)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                              isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span className="text-sm">{category.name}</span>
                            <span className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>{count}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active Filter Badge */}
              {selectedCategory && (
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filtro activo:</span>
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                  >
                    {allCategories.find((c) => slugify(c.name) === selectedCategory)?.name}
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Product Count */}
              <div className="mb-6 text-sm text-gray-600">
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/productos/${product.slug}`}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                          Ver detalles
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    {searchQuery
                      ? `No encontramos productos para "${searchQuery}". Intenta con otros términos.`
                      : "No hay productos disponibles en esta categoría por el momento."}
                  </p>
                  <Button onClick={() => handleCategoryClick(null)} variant="default">
                    Ver todos los productos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/3816772592"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>

      <Footer />
    </>
  )
}
