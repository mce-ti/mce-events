import axios from "axios"

const baseURL = "https://www.meucopoeco.com.br/eventos/api/"

export const httpClient = axios.create({ baseURL })