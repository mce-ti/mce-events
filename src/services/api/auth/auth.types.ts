export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  evento: {
    id: number
    nome: string
    local: string
    login: string
    caucao: boolean
    data: string
  }
  usuario: {
    id: number
    nome: string
    login: string
    nivel: string
    data: string
  }
} | {
  message: string
}