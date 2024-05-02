export type SyncMovementsRequest = {
  id_evento: number
  indice_estoque: number
  id_operador: number
  controle: 'Entrada' | 'Saída',
  status: 'Limpo' | 'Sujo'
  quantidade: number
  caucao: 'Sim' | 'Não',
  id_arte: number
  responsavel: string
  foto: {
    base64: string
    type: string
    name: string
    uri: string
  }
  app_time: number | string
}

export type GetMovementsRequest = {
  id_evento: number
}

export type GetMovementsResponse = {
  status: "Limpo" | "Sujo"
  id: number
  id_operador: number
  indice_estoque: number
  nome_operador: string
  controle: 'Entrada' | 'Saída'
  quantidade: number
  id_arte: number
  app_time: number
  responsavel: string
  data: string
}[]