import { Header } from '@/components/common/header'
import { api } from '@/lib/axios'
import { authConfig } from '@/utils/auth'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            localStorage.removeItem(authConfig.TOKEN_KEY)
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex flex-col min-h-screen antialiased max-w-[1600px] w-full mx-auto">
      <Header />
      <main className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24">
        <Outlet />
      </main>
    </div>
  )
}
