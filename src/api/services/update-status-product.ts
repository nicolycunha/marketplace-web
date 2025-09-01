import { api } from '@/lib/axios'
import { ProductType } from '@/types/product.types'

interface UpdateStatusProductParams {
  id: string
  status: 'available' | 'sold' | 'cancelled'
}

export async function updateStatusProduct({
  id,
  status
}: UpdateStatusProductParams) {
  const response = await api.patch<ProductType>(`/products/${id}/${status}`)

  return response.data
}
