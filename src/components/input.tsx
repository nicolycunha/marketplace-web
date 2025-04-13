import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { useState } from 'react'

interface InputProps {
  id: string
  label: string
  type?: string
  placeholder: string
  icon?: IconSvgElement
}

export function Input({
  id,
  label,
  icon,
  type = 'text',
  placeholder
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(prev => !prev)

  return (
    <div className="space-y-2">
      <label className="font-label-md text-gray-300" htmlFor={id}>
        {label}
      </label>
      <div className="flex justify-between items-center border-b border-gray-100">
        <div className="flex gap-2 items-center">
          {icon && (
            <HugeiconsIcon icon={icon} className="h-6 w-6 text-gray-200" />
          )}

          <input
            className="appearance-none bg-transparent focus:outline-none border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200"
            id={id}
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
          />
        </div>

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            className="p-1 rounded border-none focus:outline-none hover:cursor-pointer"
          >
            <HugeiconsIcon
              icon={showPassword ? ViewOffIcon : ViewIcon}
              className="h-6 w-6 text-gray-300"
            />
          </button>
        )}
      </div>
    </div>
  )
}
