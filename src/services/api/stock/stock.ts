import { httpClient } from "../httpClient"
import { GetStockResponse, GetStockRelResponse, GetStockInfosResponse, GetSujosResponse } from "./stock.types"
import axios from 'axios'

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

export const getSujos = async (id_evento: number): Promise<GetSujosResponse> => {
  try {
    const response = await httpClient.get('getSujos/' + id_evento + '?v=' + Date.now())

    const data: GetSujosResponse = response.data
    // console.log('qrcodes', data)
    return data
  } catch (error) {
    console.log(error, 'getSujos')

    const code = (axios.isAxiosError(error) && error?.response?.status) || 0;

    return {
      status: 'error',
      message: 'An error occurred',
      http_code: code,
      sujos: 0
    };
  }
}