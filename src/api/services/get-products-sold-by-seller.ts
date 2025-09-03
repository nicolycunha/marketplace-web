import { api } from '@/lib/axios'

interface GetProductsSoldBySellerResponse {
  amount: number
}

export async function getProductsSoldBySeller() {
  const response = await api.get<GetProductsSoldBySellerResponse>(
    '/sellers/metrics/products/sold'
  )

  return response.data
}
