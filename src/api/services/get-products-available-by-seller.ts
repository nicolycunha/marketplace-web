import { api } from '@/lib/axios'

interface GetProductsAvailableBySellerResponse {
  amount: number
}

export async function getProductsAvailableBySeller() {
  const response = await api.get<GetProductsAvailableBySellerResponse>(
    '/sellers/metrics/products/available'
  )

  return response.data
}
