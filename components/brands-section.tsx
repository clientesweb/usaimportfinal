"use client"

import Image from "next/image"
import Link from "next/link"

const brands = [
  {
    name: "POCO",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-2156321348-991b4acd298967b38adee45e03c079f81756159914-1920-1920-LCjPK9yDe2lm8vNmcdWrcpqxmEuwnE.webp",
  },
  {
    name: "EPSON",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911043-4736451289-50c2acc8547517d20f328b76ba557cc71756159912-1920-1920-dquHX9wegdjA8Yqj2yL5HnEQe0KuRB.webp",
  },
  {
    name: "SAMSUNG",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-7892679438-53323e9d8a7953ca9fc622dd2d7ba6f71756159913-1920-1920-M5QTLxRkQcvXkQM94Afu8D5MT1h0PS.webp",
  },
  {
    name: "Karseell",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-8415061215-4482167bd942c57dc76d622f6959847d1756159913-1920-1920-8WQi5CMygUJLT9OYjsMADjFAgzas7M.webp",
  },
  {
    name: "Lattafa",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-5555905834-30daa902f0b82141cb9b7ebf6a7d91ed1756159913-1920-1920-7vZ9UZMHVoXps3Ri4nIU1U0hOFZ240.webp",
  },
  {
    name: "Victoria's Secret",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-2128555267-f0abfa2f1c1313c54df9db3fea6a54551756159914-1920-1920-b3KNrFZ0JOFO24l93xYCdFgUBFgavj.webp",
  },
  {
    name: "JVC",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-3020163343-f21ebeebb814abec1ba74f5a6f0fc5391756159915-1920-1920-R6Ri2NjVoXniTvEul3HBBqkPkySjEZ.webp",
  },
  {
    name: "Xiaomi",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-2156321348-991b4acd298967b38adee45e03c079f81756159914-1920-1920-LCjPK9yDe2lm8vNmcdWrcpqxmEuwnE.webp",
  },
  {
    name: "JBL",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-3020163343-f21ebeebb814abec1ba74f5a6f0fc5391756159915-1920-1920-R6Ri2NjVoXniTvEul3HBBqkPkySjEZ.webp",
  },
  {
    name: "SAMSUNG",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-slide-1756159911044-7892679438-53323e9d8a7953ca9fc622dd2d7ba6f71756159913-1920-1920-M5QTLxRkQcvXkQM94Afu8D5MT1h0PS.webp",
  },
]

export default function BrandsSection() {
  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="w-full bg-white py-8 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-6 md:mb-8">Nuestras marcas</h2>

        <div className="relative mb-6 md:mb-8">
          <div className="flex gap-6 animate-scroll">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={100}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Instagram section */}
        <div className="flex items-center justify-center gap-2 md:gap-3 text-center">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
          </svg>
          <span className="text-lg md:text-xl font-semibold text-black">
            Seguinos en{" "}
            <Link
              href="https://instagram.com/usaimportarg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              @usaimportarg
            </Link>
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
