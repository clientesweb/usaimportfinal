"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerSlides = [
  {
    id: 1,
    title: "Desde el mundo",
    subtitle: "Para vos",
    description: "PRODUCTOS DE PRIMERA CALIDAD",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1754325396438-2381928755-47d535bdcd0f2d67f6e414a0b0bc07571754325401-1920-1920-XoXXZVXcW74gm7aGBnPrjStWiIYn0P.webp",
  },
  {
    id: 2,
    title: '"El mundo es tu proveedor.',
    subtitle: 'Nosotros, tu puente."',
    description:
      "Nos esforzamos constantemente por ofrecerle un servicio de calidad, una atención personalizada y los precios más competitivos del mercado.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1754325396438-8077573032-abf8652f3c066305ee1734ff7e1256821754325401-1920-1920-E5mMfhHFoliJU3ENatkyphGZeP6BEq.webp",
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Auto-slide on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))
  }

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="hidden md:grid md:grid-cols-2 gap-0">
        {bannerSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full aspect-[16/9] flex items-center justify-center bg-black overflow-hidden group cursor-pointer"
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              priority
            />
            {/* Optional overlay effect on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </div>

      <div className="md:hidden relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative aspect-video flex items-center justify-center bg-black"
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider Controls */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-blue-400 w-6" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
