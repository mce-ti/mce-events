import { httpClient } from "../httpClient"
import { GetStockResponse, GetStockRelResponse } from "./stock.types"

export const getStock = async (id_evento: number): Promise<GetStockResponse> => {
  try {
    const response = await httpClient.get('getStock/' + id_evento)

    const data: GetStockResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}

export const getStockRel = async (id_evento: number): Promise<GetStockRelResponse> => {
  try {
    const response = await httpClient.get('getStockRel/' + id_evento)

    const data: GetStockRelResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}