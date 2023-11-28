import axios from "axios"

const baseURL = "https://www.mce.dev.br/eventos/api/"

export const httpClient = axios.create({ baseURL })