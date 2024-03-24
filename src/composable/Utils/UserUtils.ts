import UserEntity from '@/composable/Entities/User'

async function getUserFromToken(tokenValue: string) {
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

	const data = await res.then(response => response.json())
	if (data.message === "ERROR") {
		return undefined
	}

	const user = new UserEntity(data.data)

  return user
}

export default getUserFromToken
