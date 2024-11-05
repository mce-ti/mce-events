import axios from 'axios'

import { httpClient } from "../httpClient"
import { LoginRequest, LoginResponse, lastedAppVersionResponse } from "./auth.types"

export const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await httpClient.post('auth?v=' + Date.now(), { username, password, appName: 'estoque' })

    const data:LoginResponse = response.data
   
    return data
  } catch (error) {
    console.log(error)

    const message = (axios.isAxiosError(error) && error?.response?.data?.message) || 'Houve um problema ao realizar a autênticação.'

    return { message }
  }
}

export const getLastedAppVersion = async (): Promise<lastedAppVersionResponse> => {
  try {
    const response = await httpClient.get('getLastedAppVersion/estoque?v=' + Date.now());

    const data:lastedAppVersionResponse = response.data
   
    return data
  } catch (error) {
    console.log(error)

    return {
      status: 'error',
      message: 'An error occurred',
      version: ''
    };
  }
}