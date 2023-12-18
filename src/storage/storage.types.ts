export type EventStorage = {
  id: number
  nome: string
  local: string
  login: string
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
  localizacao: string | null
  cor: string | null
}

export type ArtStorage = {
  id: number
  imagem: string
  nome: string
  quantidade: number
  valor: number
}

export type ProductMovementStorage = {
  id?: number
  id_evento: number
  time: number
  responsible: string
  type: 'in' | 'out'
  quantity: number
  id_art: number
  id_operator: number
  name_operator: string
  image: string
  sync?: boolean
  date?: string
}

export type StockStorage = {
  id: number
  nome: string
  quantidade: number
}[]