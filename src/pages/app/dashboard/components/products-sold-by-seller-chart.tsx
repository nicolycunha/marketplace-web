import { getProductsSoldBySeller } from '@/api/services/get-products-sold-by-seller'
import { useQuery } from '@tanstack/react-query'
import { Card } from './dashboard-card'
import { SaleTag02Icon } from '@hugeicons/core-free-icons'

export function ProductsSoldBySellerChart() {
  const { data: productsSoldBySeller } = useQuery({
    queryKey: ['metrics', 'products-sold-by-seller'],
    queryFn: () => getProductsSoldBySeller()
  })

  return (
    <>
      {productsSoldBySeller && (
        <Card
          icon={SaleTag02Icon}
          value={productsSoldBySeller?.amount}
          firstText="Produtos"
          secondText="vendidos"
        />
      )}
    </>
  )
}
