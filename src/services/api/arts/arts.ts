import { httpClient } from "../httpClient"

import type { GetArtsResponse } from "./arts.types"

export const getArts = async (id_evento: number): Promise<GetArtsResponse> => {
  try {
    const response = await httpClient.get('getArts/' + id_evento)

    const data: GetArtsResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}