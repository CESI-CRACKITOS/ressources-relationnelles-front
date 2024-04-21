export async function reportResource(
  userId: string,
  reportTypeId: string,
  resourceId: string,
  content: string
) {
  const res = fetch(`http://localhost/api/resourceReports`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      content: content,
      userId: userId,
      resourceId: resourceId,
      reportTypeId: reportTypeId
    })
  })

  const data = await res.then((response) => response.json())
  return data
}

export async function reportComment(
  userId: string,
  reportTypeId: string,
  commentId: string,
  content: string
) {
  const res = fetch('http://localhost/api/commentReport', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      content: content,
      userId: userId,
      commentId: commentId,
      reportTypeId: reportTypeId
    })
  })

  const data = await res.then((response) => response.json())
  return data
}

export async function reportUser(
  userId: string,
  reportTypeId: string,
  reportedUserId: string,
  content: string
) {
  const res = fetch('http://localhost/api/userReports', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      userId: userId.toString(),
      reportedUserId: reportedUserId.toString(),
      reportTypeId: reportTypeId.toString(),
      content: content
    })
  })

  const data = await res.then((response) => response.json())

  return data
}

export async function reportTypes() {
  const res = fetch('http://localhost/api/reportTypes', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  return data.data
}
