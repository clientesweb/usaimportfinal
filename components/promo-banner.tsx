"use client"

import Image from "next/image"
import Link from "next/link"

export default function PromoBanner() {
  return (
    <section className="w-full">
      <Link href="#" className="block w-full">
        <Image
          src="/perfumes-arabes-banner.webp"
          alt="Perfumes Árabes - USA Import"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </Link>
    </section>
  )
}
