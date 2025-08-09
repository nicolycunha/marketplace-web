import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />

      <div className="">
        <Outlet />
      </div>
    </div>
  )
}
