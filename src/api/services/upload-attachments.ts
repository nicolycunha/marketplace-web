import { api } from '@/lib/axios'

export interface UploadAttachmentsBody {
  files: File[]
}

export interface UploadAttachmentsResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function uploadAttachments({ files }: UploadAttachmentsBody) {
  const form = new FormData()

  files.forEach(file => {
    form.append(`files`, file)
  })

  const response = await api.post<UploadAttachmentsResponse>(
    '/attachments',
    form
  )

  return response.data
}
