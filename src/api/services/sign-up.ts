import { api } from '@/lib/axios'

export interface CreateNewSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

export interface CreateNewSellerResponse {
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

export async function signUp({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation
}: CreateNewSellerBody) {
  const response = await api.post<CreateNewSellerResponse>('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation
  })

  return response.data
}
