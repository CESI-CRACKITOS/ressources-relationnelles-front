import CategoryEntity from '@/composable/Entities/Category'


export async function getTendencies() {
  const res = fetch('http://localhost/api/categories/tendency', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const category: CategoryEntity[] = []
  console.log(data.data)
  for (let i = 0; i < data.data.length; i++) {
    const categoryEntity = new CategoryEntity(data.data[i])
    categoryEntity.rank = i +1
    category.push(categoryEntity)
  }

  return category
}