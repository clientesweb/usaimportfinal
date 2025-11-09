import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { featuredProducts } from "@/data/featured-products"
import { allCategories } from "@/lib/categories"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { slugify } from "@/lib/utils/slugify"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  return allCategories.map((category) => ({
    slug: slugify(category.name),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  const category = allCategories.find((cat) => {
    const categorySlug = slugify(cat.name)
    return categorySlug === slug
  })

  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = featuredProducts.filter(
    (product) => product.category.toLowerCase() === category.name.toLowerCase(),
  )

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-black font-medium">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-black">{category.name}</h1>
            <p className="text-gray-600 text-base md:text-lg">
              Explora nuestra selección de productos en {category.name.toLowerCase()}
            </p>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/productos/${product.slug}`}
                    className="w-full aspect-square mb-2 md:mb-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <h3 className="text-xs md:text-sm font-semibold text-black mb-1 md:mb-2 line-clamp-2 px-1">
                    {product.name}
                  </h3>

                  <p className="text-sm md:text-lg font-bold text-black mb-2 md:mb-3">
                    ${product.price.toLocaleString("es-AR")}
                  </p>

                  <Link href={`/productos/${product.slug}`} className="w-full">
                    <button className="w-full bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-xs md:text-sm">
                      Comprar
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay productos disponibles en esta categoría por el momento.</p>
              <Link
                href="/"
                className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Ver todos los productos
              </Link>
            </div>
          )}
        </div>
      </div>
      <WhatsAppButton />
      <Footer />
    </main>
  )
}
