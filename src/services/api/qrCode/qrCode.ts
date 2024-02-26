import { httpClient } from "../httpClient"

import type { GetQrCodeResponse } from "./qrCode.types"

export const syncQrCode = async (id_evento: number, codigo: number): Promise<GetQrCodeResponse> => {
  const formData = new FormData();
  
  formData.append('id_evento', id_evento.toString());
  formData.append('codigo', codigo.toString());

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