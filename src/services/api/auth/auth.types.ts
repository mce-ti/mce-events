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
    ativo: boolean
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
  operadores: {
    id: number
    nome: string
    localizacao: string | null
    cor: string | null
  }[]
  artes: {
    id: number
    imagem: string
    nome: string
    quantidade: number
    valor: number
  }[]
} | {
  message: string
}