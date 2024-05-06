export type EventStorage = {
  id: number;
  nome: string;
  local: string;
  login: string;
  caucao: boolean;
  data: string;
  produtos: Array<{
    id_arte: number;
    nome: string;
    quantidade: number;
    valor: number;
  }>;
}

export type UserStorage = {
  id: number
  nome: string
  id_impressora: number
  login: string
  nivel: string
  data: string
}

export type OperatorStorage = {
  id: number
  nome: string
  localizacao: string | null
  cor: string | null
  indice_estoque: number | null
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
  indice_estoque: number
  time: number
  responsible: string
  type: 'in' | 'out'
  status: 'Limpo' | 'Sujo'
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

export type StockRelStorage = {
  estoque: string
  indice: number
}[]

export type QrCodeStorage = {
  id?: number
  id_evento?: number
  codigo: string
  quantidade: number
  id_impressora?: number
  data?: string
  situacao: string
  sync?: boolean
  produtos?: {
    [id_arte: number]: {
      quantidade: string;
      valor: number;
    };
  };
}

export type StockInfosStorage = {
  estoque_limpo: { 
    [id_arte: string] : { 
      id_arte: number; 
      nome: string; 
      quantidade: number 
    }[] 
  };
  estoque_inicial: { 
    [id_arte: string]: { 
      nome: string; 
      quantidade: number 
    }[] 
  };
};