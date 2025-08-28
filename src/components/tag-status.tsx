interface TagStatusProps {
  text: 'anunciado' | 'vendido' | 'desativado'
}

export function TagStatus({ text }: TagStatusProps) {
  const color =
    text === 'anunciado'
      ? 'bg-blue-dark'
      : text === 'vendido'
      ? 'bg-success'
      : 'bg-gray-300'

  return (
    <span
      className={`w-fit py-1 px-2 rounded-2xl uppercase font-label-sm text-white ${color}`}
    >
      {text}
    </span>
  )
}
