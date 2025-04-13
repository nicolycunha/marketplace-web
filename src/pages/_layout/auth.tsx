import { Outlet } from 'react-router-dom'
import background from '@/assets/images/background.png'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[3fr_2fr] gap-6 antialiased">
      <div className="flex flex-col items-center justify-center">
        <div className="position">
          <img className="h-16 absolute left-10 top-10" src={logo} alt="" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            className="w-[80%] h-auto"
            src={background}
            alt="Acompanhe os produtos vendidos, gerencie seus anúncios e veja sua loja crescendo"
          />
        </div>
      </div>

      <div className="m-6 flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}
