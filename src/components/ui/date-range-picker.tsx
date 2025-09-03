'use client'

import { format } from 'date-fns'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar04Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ptBR } from 'date-fns/locale'

interface DateRangePickerProps extends React.ComponentProps<'div'> {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
}

export function DateRangePicker({
  date,
  onDateChange,
  className
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'ghost'}
            className={cn(
              ' justify-start text-left font-normal bg-white border-none',
              !date && 'text-muted-foreground'
            )}
          >
            <HugeiconsIcon
              className="mr-2 h-4 w-4 text-blue-base"
              icon={Calendar04Icon}
            />
            {date?.from ? (
              date.to ? (
                <span className="text-gray-300 font-label-sm">
                  {format(date.from, "dd 'de' MMMM", {
                    locale: ptBR
                  }).toUpperCase()}{' '}
                  -{' '}
                  {format(date.to, "dd 'de' MMMM", {
                    locale: ptBR
                  }).toUpperCase()}
                </span>
              ) : (
                <span className="text-gray-300 font-label-sm">
                  {format(date.from, "dd 'de' MMMM", {
                    locale: ptBR
                  }).toUpperCase()}
                </span>
              )
            ) : (
              <span>Escolha as datas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
