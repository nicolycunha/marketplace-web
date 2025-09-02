import {
  ChartHistogramIcon,
  LogoutCircle02Icon,
  PackageIcon,
  PlusSignIcon
} from '@hugeicons/core-free-icons'
import Logo from '../../assets/logo.svg'
import { HugeiconsIcon } from '@hugeicons/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Picture } from '../forms/picture'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getSellerProfile } from '@/api/services/get-seller-profile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { signOut } from '@/api/services/sign-out'
import { authConfig } from '@/utils/auth'

export function Header() {
  const navigate = useNavigate()

  const { data: seller } = useQuery({
    queryKey: ['seller'],
    queryFn: getSellerProfile,
    staleTime: Infinity
  })

  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      localStorage.removeItem(authConfig.TOKEN_KEY)
      navigate('/sign-in', { replace: true })
    }
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
        <NavLink
          to="/product"
          className="bg-orange-base font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
        >
          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
          Novo produto
        </NavLink>
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none cursor-pointer">
            <Picture size="sm" preview={seller?.seller.avatar.url} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-none mr-4 mt-3 p-4 rounded-xl w-42">
            <DropdownMenuLabel className="flex items-center gap-3 cursor-default font-body-sm text-gray-300">
              <Picture size="xs" preview={seller?.seller.avatar.url} />

              {seller?.seller.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-b border-shape my-3" />
            <DropdownMenuItem
              className="text-orange-base font-action-sm flex items-center justify-between cursor-pointer"
              onClick={() => signOutMutation()}
            >
              Sair
              <HugeiconsIcon
                icon={LogoutCircle02Icon}
                className="h-1.5 w-1.5"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
