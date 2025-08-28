import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen antialiased max-w-[1600px] w-full mx-auto">
      <Header />
      <main className="flex-1 px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24">
        <Outlet />
      </main>
    </div>
  )
}
