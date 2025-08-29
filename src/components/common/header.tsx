import {
  ChartHistogramIcon,
  PackageIcon,
  PlusSignIcon
} from '@hugeicons/core-free-icons'
import Logo from '../../assets/logo.svg'
import { HugeiconsIcon } from '@hugeicons/react'
import { NavLink } from 'react-router-dom'
import { Picture } from '../forms/picture'
import { useQuery } from '@tanstack/react-query'
import { getSellerProfile } from '@/api/services/get-seller-profile'

export function Header() {
  const { data: seller } = useQuery({
    queryKey: ['seller'],
    queryFn: getSellerProfile,
    staleTime: Infinity
  })

  return (
    <div className="border-b border-shape flex h-20 py-4 px-5 items-center justify-between">
      <img
        src={Logo}
        alt="Logotipo do marketplace, um círculo e um quadrado virado em angulo de 45 graus se encontrando"
      />

      <div className="flex items-center gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl hover:cursor-pointer hover:text-orange-base
            ${isActive ? 'bg-shape text-orange-base' : 'text-gray-300'}
          `
          }
        >
          <HugeiconsIcon icon={ChartHistogramIcon} className="h-4 w-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl hover:cursor-pointer hover:text-orange-base
            ${isActive ? 'bg-shape text-orange-base' : 'text-gray-300'}
          `
          }
        >
          <HugeiconsIcon icon={PackageIcon} className="h-4 w-4" />
          Pedidos
        </NavLink>
      </div>

      <div className="flex gap-4 items-center">
        <button className="bg-orange-base font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark">
          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
          Novo produto
        </button>
        <Picture size="sm" preview={seller?.seller.avatar.url} />
      </div>
    </div>
  )
}
