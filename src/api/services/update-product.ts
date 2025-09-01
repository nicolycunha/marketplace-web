import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

interface UpdateProductBody {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export async function updateProduct({
  id,
  title,
  description,
  categoryId,
  priceInCents,
  attachmentsIds
}: UpdateProductBody) {
  const response = await api.put<ProductType>(`/products/${id}`, {
    title,
    description,
    categoryId,
    priceInCents,
    attachmentsIds
  })

  return response.data
}
