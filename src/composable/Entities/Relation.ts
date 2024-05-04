class RelationEntity {
  id: number
  rank: number = 0
  name: string = ''
  receiverId: number = 0
  userId: number = 0
  relationTypeId: number = 0
  isPending: number = 0
  created_at: Date = new Date()
  updated_at: Date = new Date()

  constructor(relation: any) {
    this.id = relation.id
    if (relation.rank) {
      this.rank = relation.rank
    }
    if (relation.name) {
      this.name = relation.name
    }
    if (relation.receiverId) {
      this.receiverId = relation.receiverId
    }
    if (relation.userId) {
      this.userId = relation.userId
    }
    if (relation.relationTypeId) {
      this.relationTypeId = relation.relationTypeId
    }
    if (relation.isPending) {
      this.isPending = relation.isPending
    }
    if (relation.created_at) {
      this.created_at = new Date(relation.created_at)
    }
    if (relation.updated_at) {
      this.updated_at = new Date(relation.updated_at)
    }
  }
}
export default RelationEntity
