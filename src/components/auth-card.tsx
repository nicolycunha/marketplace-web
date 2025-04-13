import { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="h-full w-full p-20 flex flex-col bg-white rounded-4xl ">
      <div className="flex flex-col gap-12 h-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-title-md text-gray-500">{title}</h1>
          <p className="font-body-sm text-gray-300">{description}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
