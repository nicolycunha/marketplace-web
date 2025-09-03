import { getProductsAvailableBySeller } from '@/api/services/get-products-available-by-seller'
import { Store04Icon } from '@hugeicons/core-free-icons'
import { useQuery } from '@tanstack/react-query'
import { Card } from './dashboard-card'

export function ProductsAvailableBySeller() {
  const { data: productsAvailableBySeller } = useQuery({
    queryKey: ['metrics', 'products-available-by-seller'],
    queryFn: () => getProductsAvailableBySeller()
  })

  return (
    <>
      {productsAvailableBySeller && (
        <Card
          icon={Store04Icon}
          value={productsAvailableBySeller.amount}
          firstText="Produtos"
          secondText="anunciados"
        />
      )}
    </>
  )
}
