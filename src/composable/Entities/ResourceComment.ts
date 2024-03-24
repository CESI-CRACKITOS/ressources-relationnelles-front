import type UserEntity from "./User"

class ResourceCommentEntity {
  id: number
  userId: number
  content: string
  resourceId: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  user: UserEntity | null = null

  constructor(comment: any) {
    this.id = comment.id
    this.userId = comment.userId
    this.content = comment.content
    this.resourceId = comment.resourceId
    this.isActive = comment.isActive
    this.createdAt = comment.created_at
    this.updatedAt = comment.updated_at
  }


  setUser(user: UserEntity) {
    this.user = user
  }
}
export default ResourceCommentEntity
