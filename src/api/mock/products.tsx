import { Category, Status } from '@/types/enums'
import { ProductType } from '@/types/product.types'

const mockProducts: ProductType[] = [
  {
    id: 'a',
    title: 'Sofá',
    description:
      'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
    priceInCents: 120090, // R$ 1.200,90
    status: Status.ANUNCIADO,
    category: {
      id: '',
      slug: '',
      title: Category.MOVEL
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
      },
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: '',
    title: 'Camiseta masculina',
    description:
      'Camiseta básica cinza, confeccionada em algodão 100%, com corte slim fit e gola redonda.',
    priceInCents: 3589, // R$ 35,89
    status: Status.ANUNCIADO,
    category: {
      id: '',
      slug: '',
      title: Category.VESTUARIO
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
      },
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f37f831e?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: '',
    title: 'Mesa de jantar',
    description:
      'Mesa de jantar para 6 pessoas, em madeira de eucalipto com acabamento natural...',
    priceInCents: 89900, // R$ 899,00
    status: Status.VENDIDO,
    category: {
      id: '',
      slug: '',
      title: Category.MOVEL
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: '',
    title: 'Cadeira de escritório',
    description:
      'Cadeira ergonômica com regulagem de altura, apoio para os braços e base giratória...',
    priceInCents: 45000, // R$ 450,00
    status: Status.ANUNCIADO,
    category: {
      id: '',
      slug: '',
      title: Category.MOVEL
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop'
      },
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1562113530-57ba4cea2de8?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: '',
    title: 'Jaqueta jeans',
    description:
      'Jaqueta jeans clássica, cor azul médio, com bolsos frontais e fechamento por botões...',
    priceInCents: 12999, // R$ 129,99
    status: Status.DESATIVADO,
    category: {
      id: '',
      slug: '',
      title: Category.MOVEL
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    id: '',
    title: 'Tênis esportivo',
    description:
      'Tênis para corrida com tecnologia de amortecimento, solado antiderrapante e cabedal...',
    priceInCents: 25990, // R$ 259,90
    status: Status.ANUNCIADO,
    category: {
      id: '',
      slug: '',
      title: Category.VESTUARIO
    },
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
      avatar: {
        id: '',
        url: ''
      }
    },
    attachments: [
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
      },
      {
        id: '',
        url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop'
      }
    ]
  }
]

export default mockProducts
