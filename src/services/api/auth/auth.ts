import axios from 'axios'

import { httpClient } from "../httpClient"
import { LoginRequest, LoginResponse } from "./auth.types"

export const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {

  console.log({ username, password })

  try {
    const response = await httpClient.post('auth', { username, password })

    const data:LoginResponse = response.data

    return data
  } catch (error) {
    console.log(error)

    const message = (axios.isAxiosError(error) && error?.response?.data?.message) || 'Houve um problema ao realizar a autênticação.'

    console.log(error?.response?.data)

    return { message }
  }
}