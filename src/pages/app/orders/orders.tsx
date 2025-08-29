import mockProducts from '@/api/mock/products'
import { Filter } from './components/filter'
import { ProductCard } from './components/product-card'

export function Orders() {
  return (
    <div className="my-16 mx-42">
      <h2 className="font-title-md text-gray-500 mb-2">Seus produtos</h2>
      <p className="font-body-sm text-gray-300 mb-10">
        Acesse gerencie a sua lista de produtos à venda
      </p>

      <section className="grid grid-cols-[320px_1fr_1fr] gap-6">
        <Filter />

        <div className="col-span-2 flex flex-col xl:grid xl:grid-cols-2 gap-4">
          {mockProducts.map(product => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </section>
    </div>
  )
}
