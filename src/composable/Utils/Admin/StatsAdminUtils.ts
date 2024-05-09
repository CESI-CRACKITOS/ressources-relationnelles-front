import api from '@/config/api'
export async function getNumberOfResourcesByDay() {
  const res = fetch(api + '/admin/stats/resourcesByDay', {
    credentials: 'include'
  })
  const data = await res.then((response) => response.json())
  return await data.data
}

export async function getNumberOfCommentsByDay() {
  const res = fetch(api + '/admin/stats/commentsByDay', {
    credentials: 'include'
  })
  const data = await res.then((response) => response.json())
  return await data.data
}

export async function getNumberOfUsersByDay() {
  const res = fetch(api + '/admin/stats/usersByDay', {
    credentials: 'include'
  })
  const data = await res.then((response) => response.json())
  return await data.data
}
