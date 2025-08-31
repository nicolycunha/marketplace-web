import { Filter, FilterData } from './components/filter'
import { ProductCard } from './components/product-card'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProductsFromSeller } from '@/api/services/get-all-products-from-seller'
import { useSearchParams } from 'react-router-dom'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterData>({})

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsFromSeller,
    staleTime: Infinity
  })

  useEffect(() => {
    const urlFilters: FilterData = {}

    const search = searchParams.get('search')
    const status = searchParams.get('status')

    if (search) urlFilters.search = search
    if (status) urlFilters.status = status

    setFilters(urlFilters)
  }, [searchParams])

  const convertCentsToReais = (cents: number): string => {
    return (cents / 100).toFixed(2).replace('.', ',')
  }

  const filteredProducts = useMemo(() => {
    if (products.length > 0) {
      let filtered = [...products]

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filtered = filtered.filter(
          product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.title.toLowerCase().includes(searchTerm) ||
            product.category.slug.toLowerCase().includes(searchTerm) ||
            convertCentsToReais(product.priceInCents).includes(searchTerm) ||
            product.priceInCents.toString().includes(searchTerm)
        )
      }
      if (filters.status) {
        filtered = filtered.filter(product => product.status === filters.status)
      }

      return filtered
    }
    return products
  }, [products, filters])

  const handleFiltersChange = (newFilters: FilterData) => {
    setFilters(newFilters)

    const newSearchParams = new URLSearchParams()

    if (newFilters.search && newFilters.search.trim()) {
      newSearchParams.set('search', newFilters.search.trim())
    }

    if (newFilters.status && newFilters.status !== '') {
      newSearchParams.set('status', newFilters.status)
    }

    setSearchParams(newSearchParams)
  }

  return (
    <div className="my-16 mx-42">
      <h2 className="font-title-md text-gray-500 mb-2">Seus produtos</h2>
      <p className="font-body-sm text-gray-300 mb-10">
        Acesse gerencie a sua lista de produtos à venda
      </p>

      <section className="grid grid-cols-[320px_1fr_1fr] gap-6">
        <Filter onFiltersChange={handleFiltersChange} initialValues={filters} />

        <div className="col-span-2 flex flex-col xl:grid xl:grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.title} {...product} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              {products.length === 0
                ? 'Nenhum produto encontrado.'
                : 'Nenhum produto encontrado com os filtros aplicados.'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
