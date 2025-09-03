import { createProductToSell } from '@/api/services/create-product-to-sell'
import { getCategories } from '@/api/services/get-category'
import { uploadAttachments } from '@/api/services/upload-attachments'
import CustomSelect, {
  CustomSelectOption
} from '@/components/forms/custom-select'
import { Picture } from '@/components/forms/picture'
import { convertCentsToReais, convertReaisToCents } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InformationCircleIcon,
  Tick02Icon,
  UnavailableIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { TagStatus } from '../orders/components/tag-status'
import { getProductById } from '@/api/services/get-product-by-id'
import { updateProduct } from '@/api/services/update-product'
import { updateStatusProduct } from '@/api/services/update-status-product'
import { queryClient } from '@/lib/react-query'

const productForm = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  price: z.string().min(1, { message: 'O preço é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  category: z.string().min(1, { message: 'A categoria é obrigatória' }),
  file: z
    .any()
    .optional()
    .refine(
      file => {
        if (!file || (file instanceof FileList && file.length === 0)) {
          return true
        }
        return file instanceof FileList && file.length > 0
      },
      {
        message: 'A imagem é obrigatória'
      }
    )
})

type ProductForm = z.infer<typeof productForm>

export function Product() {
  const [preview, setPreview] = useState<string | null>(null)
  const [readOnly, setReadOnly] = useState<boolean>(false)
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
    setValue,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<ProductForm>({
    resolver: zodResolver(productForm)
  })

  const { mutateAsync: createNewProduct } = useMutation({
    mutationFn: createProductToSell,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/orders', { replace: true })
    }
  })

  const { mutateAsync: updateProductFn } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/orders', { replace: true })
    }
  })

  const { mutateAsync: updateStatusProductFn } = useMutation({
    mutationFn: updateStatusProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/orders', { replace: true })
    }
  })

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id }),
    enabled: isEditing
  })

  const { mutateAsync: uploadAttachmentsFn } = useMutation({
    mutationFn: uploadAttachments
  })

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (!numericValue) return ''

    const numberValue = parseInt(numericValue) / 100

    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const formattedValue = formatPrice(rawValue)
    setValue('price', formattedValue)
  }

  const priceRegister = register('price')

  const priceProps = {
    ...priceRegister,
    onChange: handlePriceChange
  }

  const fileList = watch('file')

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
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

  useEffect(() => {
    if (!isEditing) {
      reset({
        title: '',
        price: '',
        description: '',
        category: '',
        file: undefined
      })
      setPreview(null)
    }
  }, [isEditing, reset])

  useEffect(() => {
    if (isEditing && product && categoriesOptions.length > 0) {
      setValue('category', product.category.id)
    }
  }, [categoriesOptions, product, isEditing, setValue])

  useEffect(() => {
    if (isEditing && product && !isLoadingProduct) {
      setValue('title', product.title)

      const priceValue = convertCentsToReais(product.priceInCents)
      setValue('price', priceValue)

      setValue('description', product.description)
      setValue('category', product.category.id)

      if (product.attachments && product.attachments.length > 0) {
        setPreview(product.attachments[0].url)
      }

      setReadOnly(product?.status == 'sold' || product?.status == 'cancelled')
    }
  }, [product, isEditing, isLoadingProduct, setValue])

  async function handleSaveProduct(data: ProductForm) {
    const priceInCents = convertReaisToCents(data.price)

    const needsNewImage = !data.file || data.file.length === 0

    if (!isEditing && needsNewImage) {
      throw new Error('Imagem é obrigatória para novos produtos')
    }

    let attachmentsIds: string[] = []

    if (!needsNewImage) {
      const file = data.file[0]
      attachmentsIds = await getAttachments(file)
    } else if (isEditing && product) {
      if (product?.attachments?.length > 0) {
        attachmentsIds = [product.attachments[0].id]
      }
    }

    const productData = {
      title: data.title,
      description: data.description,
      categoryId: data.category,
      priceInCents,
      attachmentsIds
    }

    if (isEditing) {
      await updateProductFn({ ...productData, id })
    } else {
      await createNewProduct(productData)
    }
  }

  async function getAttachments(file: File) {
    const attachmentResponse = await uploadAttachmentsFn({
      files: [file]
    })
    const idAttachment = attachmentResponse.attachments[0].id
    return [idAttachment]
  }

  async function handleMarkAsSold() {
    if (!id) return

    if (product?.status == 'sold') {
      await updateStatusProductFn({
        id,
        status: 'available'
      })
    } else {
      await updateStatusProductFn({
        id,
        status: 'sold'
      })
    }
  }

  async function handleDeactivate() {
    if (!id) return

    if (product?.status == 'cancelled') {
      await updateStatusProductFn({
        id,
        status: 'available'
      })
    } else {
      await updateStatusProductFn({
        id,
        status: 'cancelled'
      })
    }
  }

  return (
    <div className="my-16 mx-42 ">
      <h2 className="font-title-md text-gray-500 mb-2">
        {isEditing ? 'Editar produto' : 'Novo produto'}
      </h2>
      <div className="flex justify-between items-center mb-10">
        <p className="font-body-sm  text-gray-300">
          {isEditing
            ? 'Gerencie as informações do produto cadastrado'
            : 'Cadastre um produto para venda no marketplace'}
        </p>
        {isEditing && (
          <section className="flex gap-4">
            <button
              className="flex items-center gap-2 text-orange-base font-action-sm cursor-pointer disabled:text-gray-200 disabled:cursor-default"
              disabled={product?.status == 'cancelled'}
              onClick={handleMarkAsSold}
            >
              <HugeiconsIcon icon={Tick02Icon} />
              {product?.status == 'sold'
                ? 'Desmarcar como vendido'
                : 'Marcar como vendido'}
            </button>
            <button
              className="flex items-center gap-2 text-orange-base font-action-sm cursor-pointer disabled:text-gray-200 disabled:cursor-default"
              disabled={product?.status == 'sold'}
              onClick={handleDeactivate}
            >
              <HugeiconsIcon
                className="h-5 w-5 text-orange-base"
                icon={UnavailableIcon}
              />
              {product?.status == 'cancelled'
                ? 'Ativar anúncio'
                : 'Desativar anúncio'}
            </button>
          </section>
        )}
      </div>

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
              disabled={readOnly}
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
          <div className="flex justify-between">
            <h1 className="font-title-sm text-gray-300">Dados do produto</h1>
            {product && <TagStatus text={product.status} />}
          </div>

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
                  disabled={readOnly}
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
                  className="appearance-none bg-transparent border-none h-12 w-full placeholder:text-gray-200 focus:outline-none focus:caret-orange-base disabled"
                  type="text"
                  id="price"
                  placeholder="0,00"
                  disabled={readOnly}
                  {...priceProps}
                  key={product?.priceInCents || 'new'}
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
                disabled={readOnly}
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
              disabled={readOnly}
            />
            {errors.category && (
              <span className="flex items-center gap-1 mt-1 text-orange-base text-sm">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="h-4 w-4 text-orange-base"
                />
                {errors.category.message}
              </span>
            )}
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
              {isEditing ? 'Salvar e publicar' : 'Salvar e atualizar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
