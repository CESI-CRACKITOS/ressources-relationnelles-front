import RelationEntity from '@/composable/Entities/Relation'

export async function getRelations() {
  const res = fetch('http://localhost/api/relationTypes', {
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