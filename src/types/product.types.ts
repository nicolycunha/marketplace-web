import { AttachmentType } from './attachment.types'
import { CategoryType } from './category.types'
import { Status } from './enums'
import { UserType } from './user.types'

export interface ProductType {
  id: string
  title: string
  description: string
  priceInCents: number
  status: Status
  owner: UserType
  category: CategoryType
  attachments: AttachmentType[]
}
