import { getViewsReceivedPerDay } from '@/api/services/get-views-received-per-day'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ResponsiveContainer, LineChart, Line, YAxis, XAxis } from 'recharts'

export function ViewsReceivedPerDayChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })

  const { data: viewsReceivedPerDay } = useQuery({
    queryKey: ['metrics', 'daily-amount-in-period'],
    queryFn: () => getViewsReceivedPerDay()
  })

  return (
    <div className="w-full bg-white p-7 rounded-3xl">
      <section className="flex items-center justify-between mb-6">
        <h1 className="font-title-sm text-gray-500">Visitantes</h1>
        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </section>

      {viewsReceivedPerDay?.viewsPerDay && (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={viewsReceivedPerDay.viewsPerDay}
            style={{ fontSize: 12 }}
          >
            <XAxis stroke="#949494" axisLine={false} tickLine={false} dy={16} />
            <YAxis
              stroke="#949494"
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="amount"
              stroke="#5ec5fd"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
