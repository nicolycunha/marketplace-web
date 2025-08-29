import { authConfig } from '@/utils/auth'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const token = localStorage.getItem(authConfig.TOKEN_KEY)
  const isAuthenticated = !!token

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
