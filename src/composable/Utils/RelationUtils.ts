import RelationEntity from '@/composable/Entities/Relation'
import PendingRelationEntity from '@/composable/Entities/PendingRelation'
import api from '@/config/api'

export async function getRelations() {
  const res = fetch(api + '/relationTypes', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())
  const relations: RelationEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const relationEntity = new RelationEntity(data.data[i])
    relationEntity.rank = i + 1
    relations.push(relationEntity)
  }

  return relations
}

export async function AddRelation(userId: number, receiverId: number, relationTypeId: string) {
  const res = fetch(api + '/relations', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      userId: userId.toString(),
      receiverId: receiverId.toString(),
      relationTypeId: relationTypeId.toString()
    })
  })

  const data = await res.then((response) => response.json())
  return data
}
export async function removeRelation(relationsId: string) {
  const res = fetch(api + '/relations/' + relationsId, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'DELETE'
  })

  const data = await res.then((response) => response.json())
  return data
}

export async function getPendingRelation() {
  const res = fetch(api + '/relations/requested', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.then((response) => response.json())

  const users: PendingRelationEntity[] = data.data.map(
    (user: any) => new PendingRelationEntity(user)
  )
  return users
}

export async function acceptPendingRelation(id: number) {
  const res = fetch(api + '/relations/' + id + '/accept', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  return data
}

export async function refusePendingRelation(id: number) {
  const res = fetch(api + '/relations/' + id + '/refuse', {
    credentials: 'include'
  })

  const data = await res.then((response) => response.json())

  return data
}
