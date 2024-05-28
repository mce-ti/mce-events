export type GetQrCodeResponse = {
  id_evento: number
  codigo: string
  quantidade: number
  id_impressora: number
  situacao: string
  data?: string
}[]

export type PutQrCodeResponse = {
  id_evento: number
  qrCodes: Array<{
    codigo: string
    quantidade: number
    id_impressora: number
    situacao: string
    data?: string
  }>
}[]