import { ImageUploadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface PictureProps {
  size?: 'sm' | 'lg' | 'xl'
  preview?: string | null
}

export function Picture({ size, preview = null }: PictureProps) {
  const baseClasses =
    'flex items-center justify-center bg-shape aspect-square cursor-pointer'

  const isNotSmall = size !== 'sm'
  const isExtraLarge = size === 'xl'

  let sizeClass = ''

  if (size === 'sm') {
    sizeClass = 'w-12 h-12 rounded-xl'
  } else if (size === 'lg') {
    sizeClass = 'w-24 h-24 rounded-xl'
  } else if (isExtraLarge) {
    sizeClass = 'rounded-3xl'
  }

  return (
    <div className={`${baseClasses} ${sizeClass} relative`}>
      {preview ? (
        <>
          <img
            src={preview}
            alt="Pré-visualização"
            className={`object-cover w-full h-full rounded-xl opacity-100 ${
              isNotSmall ? 'hover:opacity-5' : ''
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
        <div className="flex flex-col items-center justify-center">
          <HugeiconsIcon
            icon={ImageUploadIcon}
            className={`${
              isExtraLarge ? 'h-10 w-10' : 'h-8 w-8'
            } text-orange-base`}
          />
          {isExtraLarge && (
            <p className="font-body-sm pt-4 text-center text-gray-300">
              Selecione a imagem <br /> do produto
            </p>
          )}
        </div>
      )}
    </div>
  )
}
