import { api } from '@/lib/axios'

interface getViewsReceivedBySellerResponse {
  amount: number
}

export async function getViewsReceivedBySeller() {
  const response = await api.get<getViewsReceivedBySellerResponse>(
    '/sellers/metrics/views'
  )

  return response.data
}
