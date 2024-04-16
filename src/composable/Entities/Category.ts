class CategoryEntity {
  id: number
  rank: number
  slug: string
  name: string
  userId: number
  numberOfPost: number
    constructor(category : any) {
    this.id = category.id
    this.rank = category.id
    this.slug = category.slug
    this.name = category.name
    this.userId = category.userId
    this.numberOfPost = category.resources_count
  }
}
export default CategoryEntity
