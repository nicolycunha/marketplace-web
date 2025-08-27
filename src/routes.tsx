import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './pages/_layout/auth'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layout/app'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Order } from './pages/app/orders/orders'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/orders',
        element: <Order />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      }
    ]
  }
])
