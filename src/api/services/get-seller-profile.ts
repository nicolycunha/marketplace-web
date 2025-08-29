import { api } from '@/lib/axios'

export interface GetSellerProfileResponse {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export async function getSellerProfile() {
  const response = await api.get<GetSellerProfileResponse>('/sellers/me')

  return response.data
}
