import { ImageUploadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface PictureProps {
  isSmall: boolean
}

export function Picture({ isSmall = true }: PictureProps) {
  return (
    <div
      className={
        isSmall
          ? 'h-30 w-30 flex items-center justify-center bg-shape rounded-xl'
          : ''
      }
    >
      <HugeiconsIcon
        icon={ImageUploadIcon}
        className="h-8 w-8 text-orange-base"
      />
    </div>
  )
}
