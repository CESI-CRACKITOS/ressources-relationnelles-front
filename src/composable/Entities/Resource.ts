import ResourceContentEntity from '@/composable/Entities/ResourceContent'
import ResourceCommentEntity from '@/composable/Entities/ResourceComment'
import UserEntity from '@/composable/Entities/User'

class ResourceEntity {
  id: number
  categoryId: number
  slug: string
  title: string
  resourceTypeId: number
  userId: number
  isPublished: number
  isDraft: number
  created_at: Date
  updated_at: Date
  contents: ResourceContentEntity[] = []
  comments: ResourceCommentEntity[] = []
  user: UserEntity | null = null
  numberOfLikes: number
  numberOfComments: number

  constructor(resource: any) {
    this.id = resource.id
    this.categoryId = resource.categoryId
    this.slug = resource.slug
    this.title = resource.title
    this.resourceTypeId = resource.resourceTypeId
    this.userId = resource.userId
    this.isPublished = resource.isPublished
    this.isDraft = resource.isDraft
    this.created_at = resource.created_at
    this.updated_at = resource.updated_at
    this.numberOfLikes = resource.numberOflikes
    this.numberOfComments = resource.numberOfComments
  }

  addContents(content: ResourceContentEntity) {
    this.contents.push(content)
  }

  addComments(comment: ResourceCommentEntity) {
    this.comments.push(comment)
  }
  setUser(user: UserEntity) {
    this.user = user
  }
}
export default ResourceEntity
