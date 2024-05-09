import api from '@/config/api'

export async function index() {
  const res = fetch(api + '/admin/commentReports', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  const commentReports: any[] = data.data

  return commentReports
}

export async function refuse(commentReportId: number) {
  await fetch(api + `/admin/commentReports/${commentReportId}/refuse`, {
    credentials: 'include',
    method: 'PUT'
  })
}

export async function accept(commentReportId: number) {
  await fetch(api + `/admin/commentReports/${commentReportId}/accept`, {
    credentials: 'include',
    method: 'PUT'
  })
}
