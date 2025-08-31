import CustomSelect from '@/components/forms/custom-select'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const orderFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional()
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export interface FilterData {
  search?: string
  status?: string
}
interface FilterProps {
  onFiltersChange: (filters: FilterData) => void
  initialValues?: FilterData
}

export function Filter({ onFiltersChange, initialValues }: FilterProps) {
  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        search: initialValues?.search || '',
        status: initialValues?.status || ''
      }
    })

  useEffect(() => {
    if (initialValues) {
      reset({
        search: initialValues.search || '',
        status: initialValues.status || ''
      })
    }
  }, [initialValues, reset])

  function handleFilter(data: OrderFiltersSchema) {
    const filters: FilterData = {}

    if (data.search && data.search.trim()) {
      filters.search = data.search.trim()
    }

    if (data.status) {
      filters.status = data.status
    }

    onFiltersChange(filters)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="bg-white p-6 rounded-3xl h-fit"
    >
      <h1 className="font-title-sm text-gray-300 pb-6">Filtrar</h1>

      <div className="flex justify-between items-center border-b border-gray-100 mb-5">
        <div className="flex gap-2 items-center flex-row-reverse">
          <input
            className="peer appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base  transition-all"
            id="search"
            placeholder="Pesquisar"
            {...register('search')}
          />
          <HugeiconsIcon
            icon={Search01Icon}
            className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
          />
        </div>
      </div>

      <CustomSelect name="status" control={control} />

      <button
        className="bg-orange-base w-full mt-10 font-action-md border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
        type="submit"
      >
        Aplicar filtro
      </button>
    </form>
  )
}
