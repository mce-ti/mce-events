import { httpClient } from "../httpClient"

import type { GetMovementsRequest, GetMovementsResponse, SyncMovementsRequest } from './movements.types'

export const syncMovements = async (request: SyncMovementsRequest) => {
  try {
    await httpClient.post('syncMovements', {movements: request})

    return true
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
    console.log(error)
    return []
  }
}