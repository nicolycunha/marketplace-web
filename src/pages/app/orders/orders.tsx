import CustomSelect from '@/components/select'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function Order() {
  return (
    <div className="my-16 mx-42">
      <h2 className="font-title-md text-gray-500 mb-2">Seus produtos</h2>
      <p className="font-body-sm text-gray-300 mb-10">
        Acesse gerencie a sua lista de produtos à venda
      </p>

      <section className="grid grid-cols-[320px_1fr_1fr] gap-6">
        <form className="bg-white p-6 rounded-2xl">
          <h1 className="font-title-sm text-gray-300 pb-6">Filtrar</h1>

          <div className="flex justify-between items-center border-b border-gray-100 mb-5">
            <div className="flex gap-2 items-center flex-row-reverse">
              <input
                className="peer appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base  transition-all"
                id="search"
                placeholder="Pesquisar"
              />
              <HugeiconsIcon
                icon={Search01Icon}
                className="h-6 w-6 text-gray-200 peer-focus:text-orange-base"
              />
            </div>
          </div>

          <CustomSelect />

          <button
            className="bg-orange-base w-full mt-10 font-action-md border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
            type="submit"
          >
            Aplicar filtro
          </button>
        </form>

        <div className="col-span-2">Pedidos</div>
      </section>
    </div>
  )
}
