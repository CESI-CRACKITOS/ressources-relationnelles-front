import api from '@/config/api'
export async function index() {
  const res = fetch(api + '/admin/userReports', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const userReports: any[] = data.data

  return userReports
}

export async function accept(id: number) {
  const res = fetch(api + `/admin/userReport/${id}/accept`, {
    credentials: 'include',
    method: 'PUT'
  })

  await res.then((response) => response.json())
}

export async function refuse(id: number) {
  const res = fetch(api + `/admin/userReport/${id}/refuse`, {
    credentials: 'include',
    method: 'PUT'
  })

  await res.then((response) => response.json())
}
