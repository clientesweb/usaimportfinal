"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { contactConfig } from "@/lib/contact-config"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    metodoPago: "",
    notas: "",
  })

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (!isLoading && items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Tu carrito está vacío</h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
              Por favor, agrega productos antes de continuar
            </p>
            <Button
              onClick={() => router.push("/carrito")}
              className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3"
            >
              Volver al carrito
            </Button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    let message = `*NUEVO PEDIDO - USA IMPORT*\n\n`
    message += `*DATOS DEL CLIENTE:*\n`
    message += `Nombre: ${formData.nombre} ${formData.apellido}\n`
    message += `Teléfono: ${formData.telefono}\n`
    message += `Email: ${formData.email}\n\n`
    message += `*DIRECCIÓN DE ENVÍO:*\n`
    message += `${formData.direccion}\n`
    message += `${formData.ciudad}, ${formData.provincia}\n`
    message += `CP: ${formData.codigoPostal}\n\n`
    message += `*MÉTODO DE PAGO:*\n${formData.metodoPago}\n\n`

    if (formData.notas) {
      message += `*NOTAS:*\n${formData.notas}\n\n`
    }

    message += `*PRODUCTOS:*\n`
    items.forEach((item) => {
      message += `• ${item.name}\n`
      message += `  Cantidad: ${item.quantity}\n`
      message += `  Precio unitario: $${item.price.toLocaleString("es-AR")}\n`
      message += `  Subtotal: $${(item.price * item.quantity).toLocaleString("es-AR")}\n\n`
    })

    message += `*TOTAL: $${totalPrice.toLocaleString("es-AR")}*`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${contactConfig.phone.whatsapp}?text=${encodedMessage}`

    clearCart()
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8">Finalizar Compra</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 md:p-6 shadow-sm space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre *</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="mt-1 text-black"
                        placeholder="Juan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido">Apellido *</Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        type="text"
                        required
                        value={formData.apellido}
                        onChange={handleInputChange}
                        className="mt-1 text-black"
                        placeholder="Pérez"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="mt-1 text-black"
                        placeholder="11 2345-6789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 text-black"
                        placeholder="ejemplo@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">Dirección de Envío</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label htmlFor="direccion">Dirección *</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        type="text"
                        required
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="mt-1 text-black"
                        placeholder="Calle y número"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      <div>
                        <Label htmlFor="ciudad">Ciudad *</Label>
                        <Input
                          id="ciudad"
                          name="ciudad"
                          type="text"
                          required
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          className="mt-1 text-black"
                          placeholder="Buenos Aires"
                        />
                      </div>
                      <div>
                        <Label htmlFor="provincia">Provincia *</Label>
                        <Input
                          id="provincia"
                          name="provincia"
                          type="text"
                          required
                          value={formData.provincia}
                          onChange={handleInputChange}
                          className="mt-1 text-black"
                          placeholder="Buenos Aires"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codigoPostal">Código Postal *</Label>
                        <Input
                          id="codigoPostal"
                          name="codigoPostal"
                          type="text"
                          required
                          value={formData.codigoPostal}
                          onChange={handleInputChange}
                          className="mt-1 text-black"
                          placeholder="1234"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">Método de Pago</h2>
                  <div>
                    <Label htmlFor="metodoPago">Selecciona tu método de pago *</Label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      required
                      value={formData.metodoPago}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                      <option value="Mercado Pago">Mercado Pago</option>
                      <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                      <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notas">Notas adicionales (opcional)</Label>
                  <textarea
                    id="notas"
                    name="notas"
                    rows={3}
                    value={formData.notas}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black text-sm md:text-base"
                    placeholder="Información adicional sobre tu pedido..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 text-base md:text-lg font-semibold"
                >
                  Finalizar pedido por WhatsApp
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm lg:sticky lg:top-4">
                <h2 className="text-lg md:text-xl font-bold text-black mb-4 md:mb-6">Resumen del pedido</h2>

                <div className="space-y-3 mb-4 md:mb-6 max-h-48 md:max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-2 md:gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-black truncate">{item.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        <p className="text-xs md:text-sm font-semibold text-black">
                          ${(item.price * item.quantity).toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-black">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
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
