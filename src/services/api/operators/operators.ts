import { httpClient } from "../httpClient"
import type { GetOperatorsResponse } from "./operators.types"

export const getOperators = async (id_evento: number): Promise<GetOperatorsResponse> => {
  try {
    const response = await httpClient.get('getOperators/' + id_evento)

    const data: GetOperatorsResponse = response.data

    return data
  } catch (error) {
    console.log('getOperators', error)

    return []
  }
}