import api from '@/config/api'

export async function index() {
  const res = fetch(api + '/relationTypes', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const relationTypes: any[] = data.data

  return relationTypes
}

export async function destroy(id: any) {
  const res = fetch(api + '/admin/relationTypes/' + id, {
    credentials: 'include',
    method: 'DELETE'
  })
}

export async function insert(name: string) {
  await fetch(api + '/admin/relationTypes/', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  })
}

export async function update(id: any, name: string) {
  await fetch(api + `/admin/relationTypes/` + id, {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify({
      name: name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
