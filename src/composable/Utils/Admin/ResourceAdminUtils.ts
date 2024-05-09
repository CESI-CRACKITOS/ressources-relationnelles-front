import ResourceEntity from '@/composable/Entities/Resource'
import ResourceContentEntity from '@/composable/Entities/ResourceContent'
import api from '@/config/api'
export async function index() {
  const res = fetch(api + '/admin/resources', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const resources: ResourceEntity[] = []
  data.data.forEach((resource: any) => {
    const resourceEntity = new ResourceEntity(resource)
    resource.contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resourceEntity.setUser(resource.user)
    resources.push(resourceEntity)
  })
  return resources
}

export async function accept(id: number) {
  const res = fetch(api + `/admin/resources/${id}/accept`, {
    credentials: 'include',
    method: 'PUT'
  })

  await res.then((response) => response.json())
}

export async function refuse(id: number) {
  const res = fetch(api + `/admin/resources/${id}/refuse`, {
    credentials: 'include',
    method: 'PUT'
  })

  await res.then((response) => response.json())
}
