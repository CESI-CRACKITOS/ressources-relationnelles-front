import CategoryEntity from '@/composable/Entities/Category'

export async function index() {
  const res = fetch('http://localhost/api/admin/categories', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const categories: CategoryEntity[] = []
  data.data.forEach((category: any) => {
    const categoryEntity = new CategoryEntity(category)
    categories.push(categoryEntity)
  })
  return categories
}

export async function destroy(id: number) {
  const res = fetch(`http://localhost/api/admin/categories/${id}`, {
    credentials: 'include',
    method: 'DELETE'
  })
}