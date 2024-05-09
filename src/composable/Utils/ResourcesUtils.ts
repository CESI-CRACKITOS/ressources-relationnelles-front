import ResourceEntity from '@/composable/Entities/Resource'
import ResourceContentEntity from '../Entities/ResourceContent'
import ResourceCommentEntity from '../Entities/ResourceComment'
import api from '@/config/api'
export async function getResources() {
  const res = fetch(api + '/resources', {
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
    resourceEntity.setUser(data.data[i].user)
    data.data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resources.push(resourceEntity)
  }

  resources.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return resources
}

export async function getResourceById(id: number) {
  const res = fetch(api + `/resources/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const resource = new ResourceEntity(data.data)
  resource.setUser(data.data.user)
  data.data.contents.forEach((content: any) => {
    resource.addContents(new ResourceContentEntity(content))
  })

  data.data.comments.forEach((comment: any) => {
    resource.addComments(new ResourceCommentEntity(comment))
    resource.comments[resource.comments.length - 1].setUser(comment.user)
  })
  resource.comments.sort((a, b) => {
    return b.id - a.id
  })
  return resource
}

export async function getResourcesByUserId(userId: number) {
  const res = fetch(api + '/users/' + userId + '/resources', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())

  const resources: ResourceEntity[] = []

  for (let i = 0; i < data.length; i++) {
    const resourceEntity = new ResourceEntity(data[i])
    resourceEntity.setUser(data[i].user)
    data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resources.push(resourceEntity)
  }
  resources.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  return resources
}

export async function getLikedResourcesByUserId(userId: number) {
  const res = fetch(api + '/users/' + userId + '/likedResources', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())

  const resources: ResourceEntity[] = []

  for (let i = 0; i < data.length; i++) {
    const resourceEntity = new ResourceEntity(data[i])
    resourceEntity.setUser(data[i].user)
    data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resources.push(resourceEntity)
  }
  resources.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  return resources
}

export async function likeAResource(resourceId: number, userId: number) {
  const res = fetch(api + '/like/' + resourceId + '/' + userId, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PATCH'
  }).then((data) => data.json())
  const resData = await res
  if (resData.message === 'Like removed') {
    return 1
  }
  if (resData.message === 'Like added') {
    return 2
  }
  return 0
}

export async function getResourcesFromCategoryId(id: string) {
  const res = fetch(api + `/categories/${id}/resources`, {
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
    resourceEntity.setUser(data.data[i].user)
    data.data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
    })
    resources.push(resourceEntity)
  }
  resources.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  return resources
}
