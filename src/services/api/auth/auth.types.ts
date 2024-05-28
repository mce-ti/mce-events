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
    valorVoucher: number
    produtos: Array<{
      id_arte: number;
      nome: string;
      quantidade: number;
      valor: number;
    }>;
  };
  usuario: {
    id: number
    nome: string
    login: string
    senha: string
    nivel: string
    data: string
  }
} | {
  message: string
}