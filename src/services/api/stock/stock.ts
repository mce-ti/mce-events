import { httpClient } from "../httpClient"
import { GetStockResponse } from "./stock.types"

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