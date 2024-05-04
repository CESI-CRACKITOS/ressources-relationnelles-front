export async function index() {
  const res = fetch("http://localhost/api/admin/commentReports", {
    credentials: 'include'
  });

  const data = await res.then((response) => response.json())

  const commentReports: any[] = data.data

  return commentReports;
}