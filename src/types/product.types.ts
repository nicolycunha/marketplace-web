import { AttachmentType } from './attachment.types'
import { CategoryType } from './category.types'
import { UserType } from './user.types'

export interface ProductType {
  id: string
  title: string
  description: string
  priceInCents: number
  status: 'available' | 'sold' | 'cancelled'
  owner: UserType
  category: CategoryType
  attachments: AttachmentType[]
}
