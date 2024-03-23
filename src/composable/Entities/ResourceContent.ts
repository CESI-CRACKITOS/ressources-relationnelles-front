class ResourceContentEntity {
  id: number
  text: string
  link: string | null
  resource_id: number
  content_type_id: number

  constructor(resource: any) {
    this.id = resource.id
    this.text = resource.text
    this.link = resource.link
    this.resource_id = resource.resourceId
    this.content_type_id = resource.contentTypeId
  }
}
export default ResourceContentEntity
