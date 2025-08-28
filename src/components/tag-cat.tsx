interface TagCategoryProps {
  text: string
}

export function TagCategory({ text }: TagCategoryProps) {
  return (
    <span className="w-fit py-1 px-2 rounded-2xl uppercase font-label-sm text-white bg-gray-400">
      {text}
    </span>
  )
}
