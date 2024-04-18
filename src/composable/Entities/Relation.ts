class RelationEntity {
    id: number
    rank: number
    name: string
      constructor(relation : any) {
      this.id = relation.id
      this.rank = relation.id
      this.name = relation.name
    }
  }
  export default RelationEntity
  