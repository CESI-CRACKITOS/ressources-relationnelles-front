import UserEntity from '@/composable/Entities/User'
import PendingRelationEntity from '@/composable/Entities/PendingRelation'

export async function getUserFromToken(tokenValue: string) {
  const res = fetch('http://localhost/api/users/getByToken', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      tokenValue: tokenValue
    })
  })

  const data = await res.then((response) => response.json())

  const user = new UserEntity(data.data)

  return user
}

export async function getUserById(IdUser: number) {
  const res = fetch('http://localhost/api/users/' + IdUser, {})

  const data = await res.then((response) => response.json())

  const user = new UserEntity(data.data)

  return user
}

export async function getPendingRelation() {
  const res = fetch('http://localhost/api/relations/requested', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())

  const users: PendingRelationEntity[] = data.data.map(
    (user: any) => new PendingRelationEntity(user)
  )
  return users
}

export async function acceptPendingRelation(id: number) {
  const res = fetch('http://localhost/api/relation/' + id + '/accept', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  return data
}

export async function refusePendingRelation(id: number) {
  const res = fetch('http://localhost/api/relation/' + id + '/refuse', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  return data
}
