import UserEntity from './User'
class PendingRelationEntity {
  id: number
  userId: number
  receiverId: number
  relationTypeId: number
  isPending: number
  created_at: string
  updated_at: string
  user: UserEntity

  constructor(data: any) {
    this.id = data.id
    this.userId = data.userId
    this.receiverId = data.receiverId
    this.relationTypeId = data.relationTypeId
    this.isPending = data.isPending
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.user = new UserEntity(data.user)
  }
}
export default PendingRelationEntity
