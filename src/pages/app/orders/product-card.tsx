import { TagCategory } from '@/components/tag-cat'
import { TagStatus } from '@/components/tag-status'

export interface ProductCardProps {
  title: string
  description: string
  priceInCents: number
  status: 'anunciado' | 'vendido' | 'desativado'
  category: string
  attachments: {
    url: string
  }[]
}

export function ProductCard({
  title,
  description,
  priceInCents,
  status,
  category,
  attachments
}: ProductCardProps) {
  const attachment = attachments[0]

  return (
    <div className="relative w-full p-1 flex flex-col bg-white rounded-3xl hover:shadow-md transition-shadow">
      {attachment && (
        <img
          src={attachment.url}
          alt={title}
          className="h-32 sm:h-36 w-full object-cover rounded-3xl"
        />
      )}

      <section className="absolute right-3 top-3 flex gap-1">
        <TagStatus text={status} />
        <TagCategory text={category} />
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
