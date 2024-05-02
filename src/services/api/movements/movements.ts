import { httpClient } from "../httpClient"

import type { GetMovementsRequest, GetMovementsResponse, SyncMovementsRequest } from './movements.types'

export const syncMovement = async ({ foto, ...request }: SyncMovementsRequest) => {

  const formData = new FormData()

  formData.append('file', {
    uri: foto.uri,
    type: foto.type,
    name: foto.name
  } as any)

  for (const key in request) {
    const value = request[key as keyof typeof request]
    
    formData.append(key, value.toString())
  }

  try {
    const response = await httpClient.post(
      'syncMovement',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }
    })

    return !!response.data?.status
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getMovements = async (request: GetMovementsRequest) => {
  try {
    const response = await httpClient.post('getMovements', request)

    const data: GetMovementsResponse = response.data || []

    return data
  } catch (error) {
    console.log('erro aqui', error)
    return []
  }
}