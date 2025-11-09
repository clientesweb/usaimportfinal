import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/data/featured-products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">${product.price.toLocaleString("es-AR")}</span>
            </div>
            {product.installments && (
              <p className="text-xs text-muted-foreground mt-2">
                {product.installments.count} cuotas de ${product.installments.amount.toLocaleString("es-AR")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
