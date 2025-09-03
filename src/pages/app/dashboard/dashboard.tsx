import { ViewsReceivedPerDayChart } from '@/pages/app/dashboard/components/views-received-per-day-chart'
import { ProductsSoldBySellerChart } from './components/products-sold-by-seller-chart'
import { ProductsAvailableBySeller } from './components/products-available-by-seller'
import { ViewsReceivedBySeller } from './components/views-received-by-seller'

export function Dashboard() {
  return (
    <div className="my-16 mx-42">
      <h2 className="font-title-md text-gray-500 mb-2">Últimos 30 dias</h2>
      <p className="font-body-sm text-gray-300 mb-10">
        Confira as estatísticas da sua loja no último mês
      </p>

      <section className="flex gap-8">
        <div className="flex flex-col gap-4">
          <ProductsSoldBySellerChart />
          <ProductsAvailableBySeller />
          <ViewsReceivedBySeller />
        </div>
        <ViewsReceivedPerDayChart />
      </section>
    </div>
  )
}
