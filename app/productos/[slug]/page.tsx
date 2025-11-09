import { notFound } from "next/navigation"
import { allProducts } from "@/data/all-products"
import ProductDetail from "@/components/product-detail"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = allProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }))
}
