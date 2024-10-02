import { httpClient } from "../httpClient"

import type { GetMovementsRequest, GetMovementsResponse, SyncMovementsRequest } from './movements.types'

export const syncMovement = async (id_evento: number, movements: Array<{id_operador: number, indice_estoque: number, controle: string, status: string, quantidade: number, caucao: string, id_arte: number, responsavel: string, assinatura: string, app_time: number }>): Promise<SyncMovementsRequest> => {

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

    const data: SyncMovementsRequest = response.data;
console.log(data)
    return data;
  } catch (error) {
    console.log(error)
    return []
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