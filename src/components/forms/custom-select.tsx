import React, { useState, useRef, useEffect } from 'react'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Tick02Icon
} from '@hugeicons/core-free-icons'

export interface CustomSelectOption {
  value: string
  label: string
}

interface CustomSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  options: CustomSelectOption[]
  placeholder?: string
  clearable?: boolean
  icon?: IconSvgElement
  disabled?: boolean
}

const CustomSelect = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = 'Status',
  clearable = true,
  icon,
  disabled = false
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field: { onChange, value } }) => {
        const selectedOption = options.find(option => option.value === value)
        const selectedLabel = selectedOption?.label || ''

        const handleSelect = (optionValue: string): void => {
          onChange(optionValue)
          setIsOpen(false)
        }

        const handleClear = (event: React.MouseEvent): void => {
          if (disabled) return
          event.stopPropagation()
          onChange('')
          setIsOpen(false)
        }

        const handleKeyDown = (
          event: React.KeyboardEvent<HTMLButtonElement>
        ): void => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsOpen(!disabled && !isOpen)
          } else if (event.key === 'Escape') {
            setIsOpen(false)
          }
        }

        const handleOptionKeyDown = (
          event: React.KeyboardEvent<HTMLButtonElement>,
          optionValue: string
        ): void => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleSelect(optionValue)
          }
        }

        return (
          <div className="w-full flex justify-between items-center border-b border-gray-100">
            <div
              className="relative flex gap-2 items-center w-full"
              onClick={() => setIsOpen(!disabled && !isOpen)}
              ref={selectRef}
            >
              {icon && (
                <HugeiconsIcon
                  icon={icon}
                  className={`h-6 w-6 transition-colors ${
                    isOpen || value ? 'text-orange-500' : 'text-gray-200'
                  }`}
                />
              )}

              <button
                type="button"
                aria-haspopup="listbox"
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-labelledby="select-label"
                className={`peer appearance-none bg-transparent border-none h-12 w-full text-left font-body-md transition-all focus:outline-none rounded ${
                  value ? 'text-gray-400' : 'text-gray-200'
                }`}
              >
                {selectedLabel || placeholder}
              </button>

              <div className="flex items-center justify-center gap-2">
                {clearable && value && (
                  <div
                    className="h-6 w-6 bg-shape rounded-full flex items-center justify-center"
                    onClick={handleClear}
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      className="h-4 w-4 text-gray-300"
                    />
                  </div>
                )}

                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className={`mt-[1.5rem] transform -translate-y-1/2 h-6 w-6 text-gray-300 transition-transform pointer-events-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {isOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                  role="listbox"
                  aria-labelledby="select-label"
                >
                  {options.map((option: CustomSelectOption) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={value === option.value}
                      onClick={() => handleSelect(option.value)}
                      onKeyDown={e => handleOptionKeyDown(e, option.value)}
                      className={`flex justify-between w-full px-4 py-3 text-left font-body-sm transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                        value === option.value
                          ? 'text-orange-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {option.label}
                      {value === option.value && (
                        <HugeiconsIcon icon={Tick02Icon} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

export default CustomSelect
