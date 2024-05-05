export async function destroy(reportTypeId: any) {
  const res = fetch('http://localhost/api/admin/reportTypes/' + reportTypeId, {
    credentials: 'include',
    method: 'DELETE'
  })
}

export async function insert(name: string) {
  await fetch('http://localhost/api/admin/reportTypes/', {
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
  await fetch(`http://localhost/api/admin/reportTypes/` + id, {
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