import UserEntity from '@/composable/Entities/User'

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
