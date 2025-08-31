interface TagStatusProps {
  text: 'available' | 'sold' | 'canceled'
}

export function TagStatus({ text }: TagStatusProps) {
  const statusDisplay = {
    available: 'Anunciado',
    sold: 'Vendido',
    canceled: 'Desativado'
  }

  const colorMap = {
    available: 'bg-blue-dark',
    sold: 'bg-success',
    canceled: 'bg-gray-300'
  }

  return (
    <span
      className={`w-fit py-1 px-2 rounded-2xl uppercase font-label-sm text-white ${colorMap[text]}`}
    >
      {statusDisplay[text]}
    </span>
  )
}
