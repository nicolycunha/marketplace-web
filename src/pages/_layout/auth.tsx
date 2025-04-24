import { Outlet } from 'react-router-dom'
import background from '@/assets/images/background.png'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[3fr_2fr] antialiased">
      <div className="relative flex flex-col items-center justify-center">
        <img className="h-16 absolute left-10 top-10" src={logo} alt="" />

        <div className="fixed insert-y-0 left-0 w-[60%] flex items-center justify-center pointer-events-none">
          <img
            className="max-w-[80%] max-h-[80%]"
            src={background}
            alt="Acompanhe os produtos vendidos, gerencie seus anúncios e veja sua loja crescendo"
          />
        </div>
      </div>

      <div className="p-6 overflow-y-auto h-screen flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  )
}
