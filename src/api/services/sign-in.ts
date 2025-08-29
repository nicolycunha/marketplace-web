import { api } from '@/lib/axios'

export interface AuthenticateSellerBody {
  email: string
  password: string
}

export interface AuthenticateSellerResponse {
  accessToken: string
}

export async function signIn({ email, password }: AuthenticateSellerBody) {
  const response = await api.post<AuthenticateSellerResponse>(
    '/sellers/sessions',
    { email, password }
  )

  return response.data
}
