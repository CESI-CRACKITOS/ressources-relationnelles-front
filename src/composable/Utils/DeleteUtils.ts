import api from '@/config/api'

export async function deleteResource(id: number) {
  try {
    const response = await fetch(api + '/resources/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

// delete a user

export async function deleteUser(id: number) {
  try {
    const response = await fetch(api + '/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

// delete a comment

export async function deleteComment(id: number) {
  try {
    const response = await fetch(api + '/comments/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
