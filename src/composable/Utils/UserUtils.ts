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

export async function searchUsers(query: string): Promise<UserEntity[]> {
  const res = fetch('http://localhost/api/users/search/' + query, {})
  const data = await res.then((response) => response.json())
  const users: UserEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const userEntity = new UserEntity(data.data[i])
    users.push(userEntity)
  }
  return users
}

export async function getSuggestedUsers() {
  const res = await fetch('http://localhost/api/users/suggested', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const users: UserEntity[] = []
  const data = await res.json()

  if (data.data.length > 0) {
    data.data.forEach((user: UserEntity) => {
      users.push(new UserEntity(user))
    })
  }

  return users
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
