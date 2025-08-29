import { useParams } from 'react-router-dom'

export function Product() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)

  // useEffect(() => {
  //   if (isEditing && id) {
  //     // Buscar dados do produto para edição
  //     fetchProduct(id);
  //   }
  // }, [id, isEditing]);

  return (
    <div>
      <h1>{isEditing ? 'Edit product' : 'New product'}</h1>
    </div>
  )
}
