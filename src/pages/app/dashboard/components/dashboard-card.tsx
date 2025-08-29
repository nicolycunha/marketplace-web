import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'

interface CardProps {
  icon: IconSvgElement
  value: number
  firstText: string
  secondText: string
}

export function Card({ icon, value, firstText, secondText }: CardProps) {
  return (
    <div className="flex items-center  gap-4 bg-white p-3 rounded-3xl w-60">
      <div className="h-21 w-20 flex items-center justify-center bg-blue-light rounded-2xl">
        {icon && (
          <HugeiconsIcon icon={icon} className="h-10 w-10 text-blue-dark" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-title-lg text-gray-400">
          {value.toLocaleString('pt-BR')}
        </h1>
        <p className="font-body-xs text-gray-300">
          {firstText}
          <br /> {secondText}
        </p>
      </div>
    </div>
  )
}
