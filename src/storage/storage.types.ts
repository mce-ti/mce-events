export type EventStorage = {
  id: number
  nome: string
  local: string
  login: string
  ativo: boolean
  caucao: boolean
  data: string
}

export type UserStorage = {
  id: number
  nome: string
  login: string
  nivel: string
  data: string
}

export type OperatorStorage = {
  id: number
  nome: string
  cor: string | null
}

export type ArtStorage = {
  id: number
  imagem: string
  nome: string
  quantidade: number
  valor: number
}