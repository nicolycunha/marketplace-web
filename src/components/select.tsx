import React, { useState, useRef, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  Cancel01Icon,
  SaleTag02Icon,
  Tick02Icon
} from '@hugeicons/core-free-icons'

interface CustomSelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options?: CustomSelectOption[]
  placeholder?: string
  onChange?: (value: string) => void
  defaultValue?: string
  clearable?: boolean
  onClear?: () => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [
    { value: 'anunciado', label: 'Anunciado' },
    { value: 'vendido', label: 'Vendido' },
    { value: 'desativado', label: 'Desativado' }
  ],
  placeholder = 'Status',
  onChange,
  defaultValue = '',
  clearable = true,
  onClear
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)
  const [selectedLabel, setSelectedLabel] = useState<string>('')
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        option => option.value === defaultValue
      )
      if (defaultOption) {
        setSelectedLabel(defaultOption.label)
      }
    }
  }, [defaultValue, options])

  const handleClear = (event: React.MouseEvent): void => {
    event.stopPropagation()
    setSelectedValue('')
    setSelectedLabel('')
    setIsOpen(false)

    if (onClear) {
      onClear()
    }

    if (onChange) {
      onChange('')
    }
  }

  const handleSelect = (value: string, label: string): void => {
    setSelectedValue(value)
    setSelectedLabel(label)
    setIsOpen(false)

    if (onChange) {
      onChange(value)
    }
  }

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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    value: string,
    label: string
  ): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(value, label)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-between items-center border-b border-gray-100">
        <div
          className="relative flex gap-2 items-center w-full"
          onClick={() => setIsOpen(!isOpen)}
          ref={selectRef}
        >
          <HugeiconsIcon
            icon={SaleTag02Icon}
            className={`h-6 w-6 transition-colors ${
              isOpen || selectedValue ? 'text-orange-500' : 'text-gray-200'
            }`}
          />
          <button
            type="button"
            aria-haspopup="listbox"
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-labelledby="select-label"
            className={`peer appearance-none bg-transparent border-none h-12 w-full text-left font-body-md transition-all focus:outline-none  rounded ${
              selectedValue ? 'text-gray-400' : 'text-gray-200'
            }`}
          >
            {selectedLabel || placeholder}
          </button>

          <div className="flex items-center justify-center gap-2">
            {clearable && selectedValue && (
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
              className="absolute top-full left-0 right-0 mt-1 bg-white  rounded-lg shadow-lg z-50 overflow-hidden"
              role="listbox"
              aria-labelledby="select-label"
            >
              {options.map((option: CustomSelectOption) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selectedValue === option.value}
                  onClick={() => handleSelect(option.value, option.label)}
                  onKeyDown={e =>
                    handleOptionKeyDown(e, option.value, option.label)
                  }
                  className={`flex justify-between w-full px-4 py-3 text-left font-body-sm transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                    selectedValue === option.value
                      ? 'text-orange-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {option.label}
                  {selectedValue === option.value && (
                    <HugeiconsIcon icon={Tick02Icon} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomSelect
