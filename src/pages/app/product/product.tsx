import { createProductToSell } from '@/api/services/create-product-to-sell'
import { getCategories } from '@/api/services/get-category'
import { uploadAttachments } from '@/api/services/upload-attachments'
import CustomSelect, {
  CustomSelectOption
} from '@/components/forms/custom-select'
import { Picture } from '@/components/forms/picture'
import { convertReaisToCents } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const productForm = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  price: z.string().min(1, { message: 'O preço é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  category: z.string().min(1, { message: 'A categoria é obrigatória' }),
  file: z.any().refine(file => file instanceof FileList && file.length > 0, {
    message: 'A imagem é obrigatória'
  })
})

type ProductForm = z.infer<typeof productForm>

export function Product() {
  const [preview, setPreview] = useState<string | null>(null)
  const [categoriesOptions, setCategoriesOptions] = useState<
    CustomSelectOption[]
  >([])
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<ProductForm>({
    resolver: zodResolver(productForm)
  })

  const { mutateAsync: createNewProduct } = useMutation({
    mutationFn: createProductToSell,
    onSuccess: () => {
      navigate('/orders', { replace: true })
    }
  })

  const { mutateAsync: uploadAttachmentsFn } = useMutation({
    mutationFn: uploadAttachments
  })

  const fileList = watch('file')

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [fileList])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()

      const options = categories.map(category => ({
        value: category.id,
        label: category.title
      }))

      setCategoriesOptions(options)
    }

    fetchCategories()
  }, [])

  async function handleSaveProduct(data: ProductForm) {
    const fileList = data.file as FileList

    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const attachmentsIds = await getAttachments(file)
      const priceInCents = convertReaisToCents(data.price)

      await createNewProduct({
        ...data,
        attachmentsIds: attachmentsIds,
        categoryId: data.category,
        priceInCents
      })
    }
  }

  async function getAttachments(file: File) {
    const attachmentResponse = await uploadAttachmentsFn({
      files: [file]
    })
    const idAttachment = attachmentResponse.attachments[0].id
    return [idAttachment]
  }

  // useEffect(() => {
  //   if (isEditing && id) {
  //     // Buscar dados do produto para edição
  //     fetchProduct(id);
  //   }
  // }, [id, isEditing]);

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
      <form
        onSubmit={handleSubmit(handleSaveProduct)}
        className="grid grid-cols-3 gap-6"
      >
        <div className="space-y-2">
          <label htmlFor="file">
            <Picture size="xl" preview={preview} />
            <input
              id="file"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              hidden
              {...register('file')}
            />
          </label>
          {errors.file && (
            <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                className="h-4 w-4 text-orange-base"
              />
              {errors.file.message?.toString()}
            </span>
          )}
        </div>

        <div className="col-span-2 bg-white p-6 rounded-3xl h-fit w-full flex flex-col gap-5">
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
                  {...register('title')}
                />
              </div>
              {errors.title && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.title.message}
                </span>
              )}
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
                  {...register('price')}
                />
              </div>
              {errors.price && (
                <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-4 w-4 text-orange-base"
                  />
                  {errors.price.message}
                </span>
              )}
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
                {...register('description')}
              />
            </div>
            {errors.description && (
              <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="h-4 w-4 text-orange-base"
                />
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-gray-300" htmlFor="title">
              Categoria
            </label>
            <CustomSelect
              name="category"
              control={control}
              placeholder="Selecione"
              options={categoriesOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="bg-transparent font-action-md border border-orange-base p-4 rounded-xl text-orange-base hover:cursor-pointer hover:text-orange-dark hover:border-orange-dark">
              Cancelar
            </button>

            <button
              className="bg-orange-base font-action-md border-none p-4 rounded-xl text-white hover:cursor-pointer hover:bg-orange-dark"
              type="submit"
              disabled={isSubmitting}
            >
              Salvar e publicar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
