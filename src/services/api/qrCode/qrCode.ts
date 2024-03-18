import { httpClient } from "../httpClient"

import type { GetQrCodeResponse } from "./qrCode.types"

export const syncQrCode = async (id_evento: number, codigo: string, quantidade: number, id_impressora?: number): Promise<GetQrCodeResponse> => {
  const formData = new FormData();
  
  formData.append('id_evento', id_evento.toString());
  formData.append('codigo', codigo.toString());
  formData.append('quantidade', quantidade.toString());
  if(id_impressora) formData.append('id_impressora', id_impressora.toString());

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await httpClient.post('syncQrCode', formData, config);
 
    const data: GetQrCodeResponse = response.data

    return data
  } catch (error) {
    console.log('erro na requisição', error)

    return []
  }
}
export const getQrcodes = async (id_evento: number, id_impressora: number): Promise<GetQrCodeResponse> => {
  try {
    const response = await httpClient.get('getQrcodes/' + id_evento + '/' + id_impressora)

    const data: GetQrCodeResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    return []
  }
}