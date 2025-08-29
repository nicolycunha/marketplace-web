import { ImageUploadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface PictureProps {
  size: 'sm' | 'lg' | 'xl'
  preview?: string | null
}

export function Picture({ size, preview = null }: PictureProps) {
  const baseClasses = 'flex items-center justify-center bg-shape rounded-xl'

  const isNotSmall = size !== 'sm'

  let sizeClass = ''

  if (size === 'sm') {
    sizeClass = 'w-12 h-12'
  } else if (size === 'lg') {
    sizeClass = 'w-24 h-24'
  } else if (size === 'xl') {
    sizeClass = 'w-48 h-48'
  }

  return (
    <div className={`${baseClasses} ${sizeClass} relative`}>
      {preview ? (
        <>
          <img
            src={preview}
            alt="Pré-visualização"
            className={`object-cover w-full h-full rounded-xl opacity-100 ${
              isNotSmall ? 'hover:opacity-5 cursor-pointer' : ''
            }`}
          />

          {isNotSmall ? (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
              <HugeiconsIcon
                icon={ImageUploadIcon}
                className="h-8 w-8 text-orange-base"
              />
            </div>
          ) : (
            <></>
          )}
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
