import type UserEntity from './User'

class ResourceCommentEntity {
  id: number
  userId: number
  content: string
  resourceId: number
  isActive: boolean
  created_at: Date
  updated_at: Date
  user: UserEntity | null = null

  constructor(comment: any) {
    this.id = comment.id
    this.userId = comment.userId
    this.content = comment.content
    this.resourceId = comment.resourceId
    this.isActive = comment.isActive
    this.created_at = comment.created_at
    this.updated_at = comment.updated_at
  }

  setUser(user: UserEntity) {
    this.user = user
  }
}
export default ResourceCommentEntity
