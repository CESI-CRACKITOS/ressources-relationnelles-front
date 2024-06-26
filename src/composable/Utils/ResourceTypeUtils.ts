import ResourseTypeEntity from '@/composable/Entities/ResourceType'
import api from '@/config/api'

export async function getResourceTypes(): Promise<ResourseTypeEntity[]> {
  const res = await fetch(api + '/resourceTypes', {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  })

  const data = await res.json()
  const resourseType: ResourseTypeEntity[] = []
  for (let i = 0; i < data.data.length; i++) {
    const resourseTypeEntity = new ResourseTypeEntity(data.data[i])
    resourseTypeEntity.rank = i + 1
    resourseType.push(resourseTypeEntity)
  }
  return resourseType
}
