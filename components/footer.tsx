import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { contactConfig } from "@/lib/contact-config"

export default function Footer() {
  const paymentMethods = [
    { name: "Visa", src: "/payment-methods/visa.png" },
    { name: "Mastercard", src: "/payment-methods/mastercard.png" },
    { name: "Maestro", src: "/payment-methods/maestro.png" },
    { name: "American Express", src: "/payment-methods/amex.png" },
    { name: "Cabal", src: "/payment-methods/cabal.png" },
    { name: "Tarjeta Naranja", src: "/payment-methods/naranja.png" },
    { name: "Nativa", src: "/payment-methods/nativa.png" },
    { name: "Pago Fácil", src: "/payment-methods/pagofacil.png" },
    { name: "Rapipago", src: "/payment-methods/rapipago.png" },
  ]

  const shippingMethods = [{ name: "Andreani", src: "/shipping-methods/andreani.png" }]

  return (
    <footer className="bg-black border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-306717368-1754324945-138b0d584aa93d7eebe559cece4eeb9c1754324945-640-0-FVqNxKm47XIMcPE3jm0V44PVzRp29m.webp"
                alt="USA IMPORT"
                width={150}
                height={75}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 text-center md:text-left mb-4">{contactConfig.company.description}</p>
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <Link
                href={contactConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={contactConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/faqs" className="hover:text-blue-400 transition">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/como-comprar" className="hover:text-blue-400 transition">
                  Cómo Comprar
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-blue-400 transition">
                  Información de Envíos
                </Link>
              </li>
              <li>
                <Link href="/cambios-devoluciones" className="hover:text-blue-400 transition">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="hover:text-blue-400 transition">
                  Garantía
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/terminos-condiciones" className="hover:text-blue-400 transition">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidad" className="hover:text-blue-400 transition">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-blue-400 transition">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/defensa-consumidor" className="hover:text-blue-400 transition">
                  Defensa del Consumidor
                </Link>
              </li>
              <li>
                <Link href="/arrepentimiento" className="hover:text-blue-400 transition">
                  Botón de Arrepentimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`https://wa.me/${contactConfig.phone.whatsapp}`} className="hover:text-blue-400 transition">
                  {contactConfig.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-blue-400 transition">
                  {contactConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {contactConfig.location.city}, {contactConfig.location.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <h3 className="text-center text-sm font-semibold text-gray-400 mb-4">Medios de Pago</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="bg-white rounded p-2 h-8 flex items-center justify-center">
                <Image
                  src={method.src || "/placeholder.svg"}
                  alt={method.name}
                  width={50}
                  height={30}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <h3 className="text-center text-sm font-semibold text-gray-400 mb-4">Medios de Envío</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {shippingMethods.map((method) => (
              <div key={method.name} className="bg-white rounded p-2 h-8 flex items-center justify-center">
                <Image
                  src={method.src || "/placeholder.svg"}
                  alt={method.name}
                  width={80}
                  height={30}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright and Developer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} USA Import. Todos los derechos reservados.
          </p>
          <p className="text-center md:text-right">
            Desarrollado por{" "}
            <Link
              href="https://dualitydomain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Duality Domain
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
