"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import MobileMenu from "@/components/mobile-menu"
import { allCategories } from "@/lib/categories"
import { slugify } from "@/lib/utils/slugify"
import { useRouter } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { totalItems } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/productos?buscar=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShowSearchResults(false)
    }
  }

  return (
    <header className="bg-black border-b border-gray-800">
      {/* Top Bar - Logo Centered */}
      <div className="px-4 md:px-8 py-2 md:py-3 flex items-center justify-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-306717368-1754324945-138b0d584aa93d7eebe559cece4eeb9c1754324945-640-0-FVqNxKm47XIMcPE3jm0V44PVzRp29m.webp"
            alt="USA IMPORT"
            width={200}
            height={100}
            className="h-20 md:h-28 w-auto"
          />
        </Link>

        <div className="absolute right-4 md:right-8">
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900 relative">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden absolute left-4 text-white hover:bg-gray-900"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation with Search */}
      <nav className="px-4 md:px-8 py-2 border-t border-gray-800">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-blue-400 transition flex items-center gap-2 font-medium whitespace-nowrap">
                Categorías
                <span className="text-xs">▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 max-h-[500px] overflow-y-auto">
                {allCategories.map((category, index) => {
                  const categorySlug = slugify(category.name)
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="text-white hover:bg-gray-800 hover:text-blue-400 cursor-pointer"
                      asChild
                    >
                      <Link href={`/categoria/${categorySlug}`}>{category.name}</Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/productos" className="text-white hover:text-blue-400 transition font-medium whitespace-nowrap">
              Productos
            </Link>
            <Link
              href="/como-comprar"
              className="text-white hover:text-blue-400 transition font-medium whitespace-nowrap"
            >
              Cómo Comprar
            </Link>
            <Link href="/faqs" className="text-white hover:text-blue-400 transition font-medium whitespace-nowrap">
              FAQs
            </Link>
            <Link href="/contacto" className="text-white hover:text-blue-400 transition font-medium whitespace-nowrap">
              Contacto
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md ml-auto">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-white text-black rounded-l text-sm placeholder-gray-500"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-r rounded-l-none px-4">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
