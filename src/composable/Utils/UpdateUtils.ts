//update resource

import type ResourceEntity from '../Entities/Resource'
import type UserEntity from '../Entities/User'
import type ResourceCommentEntity from '../Entities/ResourceComment'

export async function updateResource(resource: ResourceEntity) {
  const res = await fetch(`http://localhost/api/resources/${resource.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(resource)
  })

  return res
}

// update a user

export async function updateUser(user: UserEntity) {
  const res = await fetch(`http://localhost/api/users/${user.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(user)
  })

  return res
}

// update a comment
export async function updateComment(comment: ResourceCommentEntity) {
  const res = await fetch(`http://localhost/api/comments/${comment.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(comment)
  })

  return res
}
