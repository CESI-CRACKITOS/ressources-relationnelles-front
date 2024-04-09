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

export async function getUserById(IdUser: number) {
  const res = fetch('http://localhost/api/users/' + IdUser, {})

  const data = await res.then((response) => response.json())

  const user = new UserEntity(data.data)

  return user
}
