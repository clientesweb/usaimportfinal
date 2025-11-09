"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-4 md:mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Tu carrito está vacío</h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Agrega productos para comenzar tu compra</p>
            <Link href="/">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3">Ver productos</Button>
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8">Carrito de Compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-3 md:p-4 lg:p-6 shadow-sm">
                  <div className="flex gap-3 md:gap-4">
                    <Link href={`/productos/${item.slug}`} className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/productos/${item.slug}`}>
                          <h3 className="font-semibold text-base md:text-lg text-black hover:text-blue-600 transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1 md:p-2 flex-shrink-0"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      <p className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
                        ${item.price.toLocaleString("es-AR")}
                      </p>

                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 text-black"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <span className="text-base md:text-lg font-medium w-10 md:w-12 text-center text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 text-black"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm lg:sticky lg:top-4">
                <h2 className="text-lg md:text-xl font-bold text-black mb-4 md:mb-6">Resumen del pedido</h2>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600 truncate pr-2">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-black flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 md:pt-4 mb-4 md:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-black">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold"
                >
                  Continuar con la compra
                </Button>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-gray-300 hover:bg-gray-50 text-black bg-transparent"
                  >
                    Seguir comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
