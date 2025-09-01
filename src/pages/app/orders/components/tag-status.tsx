interface TagStatusProps {
  text: 'available' | 'sold' | 'cancelled'
}

export function TagStatus({ text }: TagStatusProps) {
  const statusDisplay = {
    available: 'Anunciado',
    sold: 'Vendido',
    cancelled: 'Desativado'
  }

  const colorMap = {
    available: 'bg-blue-dark',
    sold: 'bg-success',
    cancelled: 'bg-gray-300'
  }

  return (
    <span
      className={`w-fit py-1 px-2 rounded-2xl uppercase font-label-sm text-white ${colorMap[text]}`}
    >
      {statusDisplay[text]}
    </span>
  )
}
