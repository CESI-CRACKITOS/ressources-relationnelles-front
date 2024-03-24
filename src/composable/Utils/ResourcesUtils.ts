import ResourceEntity from '@/composable/Entities/Resource'
import ResourceContentEntity from '../Entities/ResourceContent'
import ResourceCommentEntity from '../Entities/ResourceComment'

export async function getResources() {
  const res = fetch('http://localhost/api/resources', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const resources: ResourceEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const resourceEntity = new ResourceEntity(data.data[i])
    data.data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resources.push(resourceEntity)
  }

  return resources
}

export async function getResourceById(id: number) {
  const res = fetch(`http://localhost/api/resources/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const resource = new ResourceEntity(data.data)

  data.data.contents.forEach((content: any) => {
    resource.addContents(new ResourceContentEntity(content))
  })

  data.data.comment.forEach((comment: any) => {
    resource.addComments(new ResourceCommentEntity(comment))
    resource.comments[resource.comments.length - 1].setUser(comment.user)
  })

  return resource
}
