import CategoryEntity from '@/composable/Entities/Category'

export async function index() {
  const res = fetch('http://localhost/api/categories', {
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

export async function insert(category: CategoryEntity) {
  await fetch(`http://localhost/api/admin/categories/`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function update(category: CategoryEntity) {
  await fetch(`http://localhost/api/admin/categories/${category.id}`, {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
