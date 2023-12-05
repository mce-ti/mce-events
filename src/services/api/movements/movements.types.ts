export type SyncMovementsRequest = {
  id_evento: number
  id_operador: number
  controle: 'Entrada' | 'Saída',
  quantidade: number
  caucao: 'Sim' | 'Não',
  id_arte: number
  responsavel: string
  foto: string
  app_time: number | string
}[]

export type GetMovementsRequest = {
  id_evento: number
}

export type GetMovementsResponse = {
  id: number
  id_evento: number
  id_operador: number
  controle: 'Entrada' | 'Saída'
  quantidade: number
  caucao: 'Sim' | 'Não'
  id_arte: number
  app_time: number | string
  responsavel: string
  foto: string
  data: string
}[]