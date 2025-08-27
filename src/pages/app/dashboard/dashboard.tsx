import { Chart } from '@/components/chat'
import { Card } from '@/components/dashboard-card'
import {
  SaleTag02Icon,
  Store04Icon,
  UserMultiple02Icon
} from '@hugeicons/core-free-icons'

export function Dashboard() {
  return (
    <div className="my-16 mx-42">
      <h2 className="font-title-md text-gray-500 mb-2">Últimos 30 dias</h2>
      <p className="font-body-sm text-gray-300 mb-10">
        Confira as estatísticas da sua loja no último mês
      </p>

      <section className="flex gap-8">
        <div className="flex flex-col gap-4">
          <Card
            icon={SaleTag02Icon}
            value={24}
            firstText="Produtos"
            secondText="vendidos"
          />
          <Card
            icon={Store04Icon}
            value={56}
            firstText="Produtos"
            secondText="anunciados"
          />
          <Card
            icon={UserMultiple02Icon}
            value={1238}
            firstText="Pessoas"
            secondText="visitantes"
          />
        </div>
        <Chart />
      </section>
    </div>
  )
}
