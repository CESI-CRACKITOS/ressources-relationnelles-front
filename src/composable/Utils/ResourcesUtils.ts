import ResourceEntity from '@/composable/Entities/Resource'
import ResourceContentEntity from '../Entities/ResourceContent'
import UserEntity from '../Entities/User'
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
      resourceEntity.setUser(data.data[i].user)
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

  resource.setUser(data.data.user)
  data.data.contents.forEach((content: any) => {
    resource.addContents(new ResourceContentEntity(content))
  })

  data.data.comments.forEach((comment: any) => {
    resource.addComments(new ResourceCommentEntity(comment))
    resource.comments[resource.comments.length - 1].setUser(comment.user)
  })


  return resource
}

export async function getResourcesByUserId(userId: number) {
  const res = fetch('http://localhost/api/users/' + userId + '/resources', {
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
    data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
      resourceEntity.setUser(data[i].user)
    })
    resources.push(resourceEntity)
  }
  return resources
}

export async function getLikedResourcesByUserId(userId: number) {
  const res = fetch('http://localhost/api/users/' + userId + '/likedResources', {
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
    data[i].contents.forEach((content: any) => {
      resourceEntity.addContents(new ResourceContentEntity(content))
      resourceEntity.setUser(data[i].user)
    })
    resources.push(resourceEntity)
  }
  return resources
}

export async function likeAResource(resourceId: number, userId: number) {
  const res = fetch('http://localhost/api/like/' + resourceId + '/' + userId, {
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
