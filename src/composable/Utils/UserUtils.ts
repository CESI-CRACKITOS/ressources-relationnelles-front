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

export async function getSuggestedUsers() {
  const res = await fetch('http://localhost/api/users/suggested', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })

  const users :UserEntity[] = [];
  const data = await res.json()

  if (data.data.length > 0) {
    data.data.forEach((user: UserEntity) => {
      users.push(new UserEntity(user));
    })
  }

  return users;

}

export async function getUserById(IdUser: string) {
  const res = fetch('http://localhost/api/users/' + IdUser, {
    method: 'GET',
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const user = new UserEntity(data.data)

  return user
}

export async function AddRelation(userId: number, receiverId: number, relationTypeId: number) {
  const res = fetch('http://localhost/api/relations', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      userId: userId.toString(),
      receiverId: receiverId.toString(),
      relationTypeId: relationTypeId.toString()
    })
  })

  const data = await res.then((response) => response.json())
  return data
}
export async function removeRelation(relationsId: string) {
  const res = fetch('http://localhost/api/relations' + relationsId, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'DELETE'
  })

  const data = await res.then((response) => response.json())
  return data
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
