"use client"

import type React from "react"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { allCategories } from "@/lib/categories"
import { slugify } from "@/lib/utils/slugify"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/productos?buscar=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      onClose()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-gray-900 border-gray-800 p-0 overflow-y-auto">
        <SheetHeader className="px-6 py-4 border-b border-gray-800">
          <SheetTitle className="text-white text-left font-bold text-lg">Menú</SheetTitle>
        </SheetHeader>

        <div className="px-6 py-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-white text-black rounded text-sm placeholder-gray-500"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3">
              <Search className="w-4 h-4" />
            </Button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 mb-6">
            <Link
              href="/productos"
              className="text-white hover:text-blue-400 hover:bg-gray-800 transition font-medium py-3 px-3 rounded"
              onClick={onClose}
            >
              Productos
            </Link>
            <Link
              href="/faqs"
              className="text-white hover:text-blue-400 hover:bg-gray-800 transition font-medium py-3 px-3 rounded"
              onClick={onClose}
            >
              FAQs
            </Link>
            <Link
              href="/contacto"
              className="text-white hover:text-blue-400 hover:bg-gray-800 transition font-medium py-3 px-3 rounded"
              onClick={onClose}
            >
              Contacto
            </Link>
          </div>

          {/* Categories List */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide px-3">Categorías</h3>
            <div className="flex flex-col gap-1">
              {allCategories.map((category, index) => {
                const categorySlug = slugify(category.name)
                return (
                  <Link
                    key={index}
                    href={`/categoria/${categorySlug}`}
                    className="text-white hover:text-blue-400 hover:bg-gray-800 transition py-3 px-3 rounded font-medium"
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
