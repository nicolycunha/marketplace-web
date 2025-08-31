import { api } from '@/lib/axios'
import { CategoryType } from '@/types/category.types'

interface GetCategoryResponse {
  categories: CategoryType[]
}

export async function getCategories() {
  const result = await api.get<GetCategoryResponse>('/categories')

  return result.data.categories
}
