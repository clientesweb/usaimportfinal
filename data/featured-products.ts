export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  slug: string
  description?: string
  fullDescription?: string
  images?: string[]
  features?: string[]
}

import { accesoriosCelularProducts } from "./products/accesorios-celular"
import { seguridadProducts } from "./products/seguridad"
import { bellezaProducts } from "./products/belleza"
import { tecnologiaProducts } from "./products/tecnologia"
import { tvAudioProducts } from "./products/tv-audio"
import { perfumeriaProducts } from "./products/perfumeria"
import { celularesProducts } from "./products/celulares"
import { hogarProducts } from "./products/hogar"
import { electrodomesticosProducts } from "./products/electrodomesticos"
import { scooterMotosProducts } from "./products/scooter-motos"
import { vapersProducts } from "./products/vapers"

export const featuredProducts: Product[] = [
  ...bellezaProducts,
  ...accesoriosCelularProducts,
  ...seguridadProducts,
  ...tecnologiaProducts,
  ...celularesProducts,
  ...tvAudioProducts,
  ...perfumeriaProducts,
  ...hogarProducts,
  ...electrodomesticosProducts,
  ...scooterMotosProducts,
  ...vapersProducts,
]
