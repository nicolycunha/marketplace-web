import { TagCategory } from '@/pages/app/orders/tag-category'
import { TagStatus } from '@/pages/app/orders/tag-status'
import { ProductType } from '@/types/product.types'
import { useNavigate } from 'react-router-dom'

export function ProductCard({
  id,
  title,
  description,
  priceInCents,
  status,
  category,
  attachments
}: ProductType) {
  const attachment = attachments[0]

  const navigate = useNavigate()

  function handleEditProduct(productId: string) {
    navigate(`/product/${productId}`, { replace: true })
  }

  return (
    <div
      className="relative w-full p-1 flex flex-col bg-white rounded-3xl hover:shadow-md transition-shadow hover:cursor-pointer"
      onClick={() => handleEditProduct(id)}
    >
      {attachment && (
        <img
          src={attachment.url}
          alt={title}
          className="h-32 sm:h-36 w-full object-cover rounded-3xl"
        />
      )}

      <section className="absolute right-3 top-3 flex gap-1">
        <TagStatus text={status} />
        <TagCategory title={category.title} />
      </section>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-subtitle text-gray-400 text-sm sm:text-base line-clamp-1 flex-1">
            {title}
          </h2>
          <h3 className="font-title-sm text-right shrink-0">
            <span className="font-label-md text-color-500 mr-1">R$</span>
            <span className="text-sm sm:text-base">
              {(priceInCents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </h3>
        </div>
        <p className="font-body-sm text-gray-300 line-clamp-2 mb-1">
          {description}
        </p>
      </div>
    </div>
  )
}
