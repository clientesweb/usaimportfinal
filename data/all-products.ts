import type { Product } from "@/types/product"
import { tvAudioProducts } from "./products/tv-audio"
import { tecnologiaProducts } from "./products/tecnologia"
import { accesoriosCelularProducts } from "./products/accesorios-celular"
import { electrodomesticosProducts } from "./products/electrodomesticos"
import { hogarProducts } from "./products/hogar"
import { seguridadProducts } from "./products/seguridad"
import { scooterMotosProducts } from "./products/scooter-motos"
import { bellezaProducts } from "./products/belleza"
import { perfumeriaProducts } from "./products/perfumeria"
import { celularesProducts } from "./products/celulares"
import { vapersProducts } from "./products/vapers"

// Combine all products from all categories
export const allProducts: Product[] = [
  ...tvAudioProducts,
  ...tecnologiaProducts,
  ...accesoriosCelularProducts,
  ...electrodomesticosProducts,
  ...hogarProducts,
  ...seguridadProducts,
  ...scooterMotosProducts,
  ...bellezaProducts,
  ...perfumeriaProducts,
  ...celularesProducts,
  ...vapersProducts,
]
