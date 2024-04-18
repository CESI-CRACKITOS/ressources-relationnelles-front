class ResourseTypeEntity {
    id: number
    rank: number
    name: string
      constructor(resourceType : any) {
      this.id = resourceType.id
      this.rank = resourceType.rank
      this.name = resourceType.name
    }
  }
  export default ResourseTypeEntity
  