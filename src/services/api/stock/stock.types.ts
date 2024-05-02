export type GetStockResponse = {
  id: number
  nome: string
  quantidade: number
}[]

export type GetStockRelResponse = {
  estoque: string
  indice: number
}[]

export type GetStockInfosResponse = {
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
}[];