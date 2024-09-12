import { httpClient } from "../httpClient"
import { GetStockResponse, GetStockRelResponse, GetStockInfosResponse } from "./stock.types"

export const getStock = async (id_evento: number): Promise<GetStockResponse> => {
  try {
    const response = await httpClient.get('getStock/' + id_evento + '?v=' + Date.now())

    const data: GetStockResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}

export const getStockLimpos = async (id_evento: number): Promise<GetStockResponse> => {
  try {
    const response = await httpClient.get('getStockLimpos/' + id_evento + '?v=' + Date.now())

    const data: GetStockResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}

export const getStockRel = async (id_evento: number): Promise<GetStockRelResponse> => {
  try {
    const response = await httpClient.get('getStockRel/' + id_evento + '?v=' + Date.now())

    const data: GetStockRelResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}

export const getStockInfos = async (id_evento: number): Promise<GetStockInfosResponse> => {
  try {
    const response = await httpClient.get('getStockInfos/' + id_evento + '?v=' + Date.now())

    const data: GetStockInfosResponse = response.data
    
    return data
  } catch (error) {
    console.log(error)

    return []
  }
}