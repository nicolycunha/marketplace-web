import { getViewsReceivedBySeller } from '@/api/services/get-views-received-by-seller'
import { UserMultiple02Icon } from '@hugeicons/core-free-icons'
import { useQuery } from '@tanstack/react-query'
import { Card } from './dashboard-card'

export function ViewsReceivedBySeller() {
  const { data: viewsReceivedBySeller } = useQuery({
    queryKey: ['metrics', 'views-received-by-seller'],
    queryFn: () => getViewsReceivedBySeller()
  })

  return (
    <>
      {viewsReceivedBySeller && (
        <Card
          icon={UserMultiple02Icon}
          value={viewsReceivedBySeller.amount}
          firstText="Pessoas"
          secondText="visitantes"
        />
      )}
    </>
  )
}
