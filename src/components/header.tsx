import {
  ChartHistogramIcon,
  PackageIcon,
  PlusSignIcon
} from '@hugeicons/core-free-icons'
import Logo from '../assets/logo.svg'
import { HugeiconsIcon } from '@hugeicons/react'

export function Header() {
  return (
    <div className="border-b border-shape flex h-20 py-4 px-5 items-center justify-between">
      <img
        src={Logo}
        alt="Logotipo do marketplace, um círculo e um quadrado virado em angulo de 45 graus se encontrando"
      />

      <div className="flex items-center gap-2">
        {/* active -> bg-shape text-orange-base */}

        <button className="font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl text-gray-300 hover:cursor-pointer hover:text-orange-base">
          <HugeiconsIcon icon={ChartHistogramIcon} className="h-4 w-4" />
          Dashboard
        </button>

        <button className="font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl text-gray-300 hover:cursor-pointer hover:text-orange-base">
          <HugeiconsIcon icon={PackageIcon} className="h-4 w-4" />
          Pedidos
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <button className="bg-orange-base font-action-sm flex gap-2 justify-between items-center border-none py-3 px-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark">
          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
          Novo produto
        </button>
        <h1>Foto</h1>
      </div>
    </div>
  )
}
