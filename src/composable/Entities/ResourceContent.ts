class ResourceContentEntity {
  id: number
  text: string
  link: string | null
  resource_id: number
  content_type_id: number
  base64: string

  constructor(resource: any) {
    this.id = resource.id
    this.text = resource.text
    this.link = resource.link
    this.resource_id = resource.resourceId
    this.content_type_id = resource.contentTypeId
    this.base64 = resource.base64
  }
}
export default ResourceContentEntity
