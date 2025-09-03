import { api } from '@/lib/axios'

interface GetViewsReceivedPerDayResponse {
  viewsPerDay: {
    date: string
    amount: number
  }[]
}

export async function getViewsReceivedPerDay() {
  const response = await api.get<GetViewsReceivedPerDayResponse>(
    '/sellers/metrics/views/days'
  )

  return response.data
}
