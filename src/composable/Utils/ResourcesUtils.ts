import ResourceEntity from '@/composable/Entities/Resource'
import ResourceContentEntity from '../Entities/ResourceContent'

async function getResources() {
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

export default getResources
