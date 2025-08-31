import CustomSelect from '@/components/forms/custom-select'
import { Picture } from '@/components/forms/picture'
import { Category } from '@/types/enums'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

const productSchema = z.object({
  category: z.string()
})

type ProductSchema = z.infer<typeof productSchema>

export function Product() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)

  const { control } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema)
  })

  // useEffect(() => {
  //   if (isEditing && id) {
  //     // Buscar dados do produto para edição
  //     fetchProduct(id);
  //   }
  // }, [id, isEditing]);

  const categoryOptions = Object.entries(Category).map(([key, value]) => ({
    value: key.toLowerCase(),
    label: value
  }))

  return (
    <div className="my-16 mx-42 ">
      <h2 className="font-title-md text-gray-500 mb-2">
        {isEditing ? 'Edit product' : 'Novo produto'}
      </h2>
      <p className="font-body-sm mb-10 text-gray-300">
        {isEditing
          ? 'Edit product'
          : 'Cadastre um produto para venda no marketplace'}
      </p>
      <section className="grid grid-cols-3 gap-6">
        <Picture size="xl" />

        <form
          action=""
          className="col-span-2 bg-white p-6 rounded-3xl h-fit w-full flex flex-col gap-5"
        >
          <h1 className="font-title-sm text-gray-300">Dados do produto</h1>

          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-2 col-span-2">
              <label className="font-label-md text-gray-300" htmlFor="title">
                Título
              </label>
              <div className="border-b border-gray-100">
                <input
                  className="appearance-none bg-transparent border-none h-12 w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base "
                  id="title"
                  placeholder="Nome do produto"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-gray-300" htmlFor="price">
                Valor
              </label>
              <div className="flex justify-between items-center border-b border-gray-100 text-color-400 font-body-md">
                <span className="pr-1">R$</span>
                <input
                  className="appearance-none bg-transparent border-none h-12 w-full  placeholder:text-gray-200 focus:outline-none focus:caret-orange-base "
                  type="number"
                  id="price"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="font-label-md text-gray-300"
              htmlFor="description"
            >
              Descrição
            </label>
            <div className="border-b border-gray-100 pt-3">
              <textarea
                className="appearance-none bg-transparent border-none w-full text-gray-400 font-body-md placeholder:text-gray-200 focus:outline-none focus:caret-orange-base resize-none"
                id="description"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-gray-300" htmlFor="title">
              Categoria
            </label>
            <CustomSelect
              name="category"
              control={control}
              placeholder="Selecione"
              options={categoryOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="bg-transparent font-action-md border border-orange-base p-4 rounded-xl text-orange-base hover:cursor-pointer hover:text-orange-dark hover:border-orange-dark">
              Cancelar
            </button>

            <button
              className="bg-orange-base font-action-md border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
              type="submit"
            >
              Salvar e publicar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
