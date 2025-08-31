import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

interface CreateProductToSellBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export async function createProductToSell({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds
}: CreateProductToSellBody) {
  const result = await api.post<ProductType[]>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds
  })

  return result.data
}
