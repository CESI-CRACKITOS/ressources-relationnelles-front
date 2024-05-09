import CategoryEntity from '@/composable/Entities/Category'
import api from '@/config/api'

export async function getTendencies() {
  const res = fetch(api + '/categories/tendency', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const category: CategoryEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const categoryEntity = new CategoryEntity(data.data[i])
    categoryEntity.rank = i + 1
    category.push(categoryEntity)
  }

  return category
}

export async function getCategories() {
  const res = fetch(api + '/categories', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const category: CategoryEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const categoryEntity = new CategoryEntity(data.data[i])
    categoryEntity.rank = i + 1
    category.push(categoryEntity)
  }
  return category
}
