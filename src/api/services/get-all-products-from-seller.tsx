import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

export async function getAllProductsFromSeller() {
  const result = await api.get<ProductType[]>('products/me')

  return result.data
}
