import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

interface GetAllProductsFromSellerResponse {
  products: ProductType[]
}

export async function getAllProductsFromSeller() {
  const result = await api.get<GetAllProductsFromSellerResponse>('products/me')

  return result.data.products
}
