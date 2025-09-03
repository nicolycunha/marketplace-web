import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

interface GetProductByIdParams {
  id?: string
}

interface GetProductByIdResponse {
  product: ProductType
}

export async function getProductById({ id }: GetProductByIdParams) {
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`)

  return response.data.product
}
