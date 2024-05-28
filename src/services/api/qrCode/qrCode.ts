import { httpClient } from "../httpClient"

import type { GetQrCodeResponse, PutQrCodeResponse } from "./qrCode.types"

export const syncQrCode = async (id_evento: number, qrCodes: Array<{codigo: string, quantidade: number, situacao: string, id_impressora?: number, produtos?: object}>): Promise<PutQrCodeResponse> => {
  const formData = new FormData();

  formData.append('id_evento', id_evento.toString());
  formData.append('qrCodes', JSON.stringify(qrCodes));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await httpClient.post('syncQrCode?v=' + Date.now(), formData, config);
 
    const data: PutQrCodeResponse = response.data
    console.log('retorno', data)
    return data;
  } catch (error) {
    console.log('erro na requisição', error)

    return []
  }
}
export const getQrcodes = async (id_evento: number, id_impressora: number): Promise<GetQrCodeResponse> => {
  try {
    
    const response = await httpClient.get('getQrcodes/' + id_evento + '/' + id_impressora + '?v=' + Date.now())

    const data: GetQrCodeResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}

export const cancelQrCode = async (codigo: string): Promise<GetQrCodeResponse> => {
  try {
    const response = await httpClient.get('cancelQrCode/' + codigo + '?v=' + Date.now())

    const data: GetQrCodeResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}