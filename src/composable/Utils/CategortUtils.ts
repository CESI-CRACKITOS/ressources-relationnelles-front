import CategoryEntity from '@/composable/Entities/Category'

export async function getCategory(): Promise<CategoryEntity[]> {
    const res = await fetch('http://localhost/api/categories', {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET'
    })

    const data = await res.json()
    const categories: CategoryEntity[] = []

    for (let i = 0; i < data.data.length; i++) {
        const categoryEntity = new CategoryEntity(data.data[i])
        categoryEntity.rank = i + 1
        categories.push(categoryEntity)
    }

    return categories
}