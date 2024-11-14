import { httpClient } from "../httpClient"
import axios from 'axios'

import type { GetMovementsRequest, GetMovementsResponse, SyncMovementsRequest, PutMovementsResponse } from './movements.types'

export const syncMovement = async (id_evento: number, movements: Array<{id_operator: number, indice_estoque: number, type: string, status: string, quantity: number, id_art: number, responsible: string, assinatura: string, name_operator: string, time: number }>): Promise<PutMovementsResponse> => {

  const formData = new FormData()

  formData.append('id_evento', id_evento.toString());
  formData.append('movements', JSON.stringify(movements));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await httpClient.post('syncMovement?v=' + Date.now(), formData, config);

    const data: PutMovementsResponse = response.data;
    // console.log(data)
    return data;
  } catch (error) {
    const code = (axios.isAxiosError(error) && error?.response?.status) || 0;

    const response: PutMovementsResponse = {
      status: 'error',
      message: error ? error.toString() : 'Um erro ocorreu ao comunicar a API.',
      http_code: code,
      inserted_time: []
    };

    console.log(response, 'syncMovement')
    
    return response;
  }
}

export const getMovements = async (request: GetMovementsRequest) => {
  try {
    const response = await httpClient.post('getMovements?v=' + Date.now(), request)

    const data: GetMovementsResponse = response.data || []
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)

    return {
      status: 'error',
      message: 'An error occurred',
      data: []
    };
  }
}