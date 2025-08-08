import { ImageUploadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface PictureProps {
  isSmall?: boolean
  preview?: string | null
}

export function Picture({ preview = null, isSmall = true }: PictureProps) {
  const baseClasses =
    'flex items-center justify-center bg-shape rounded-xl cursor-pointer'
  const sizeClasses = isSmall ? 'w-30 h-30' : 'w-48 h-48'

  return (
    <div className={`${baseClasses} ${sizeClasses} relative`}>
      {preview ? (
        <>
          <img
            src={preview}
            alt="Pré-visualização"
            className="object-cover w-full h-full rounded-xl opacity-100 hover:opacity-5"
          />

          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
            <HugeiconsIcon
              icon={ImageUploadIcon}
              className="h-8 w-8 text-orange-base"
            />
          </div>
        </>
      ) : (
        <HugeiconsIcon
          icon={ImageUploadIcon}
          className="h-8 w-8 text-orange-base"
        />
      )}
    </div>
  )
}
