export type ItemStock = {
  nome: string;
  quantidade: number;
};

export const calcInitialStockQuantity = (
  estoqueInicial: ItemStock[],
  quantity: number
): boolean => {
  const totalInicial = estoqueInicial.map(item => item.quantidade);

  const somaTotalInicial = totalInicial.reduce((acc, quantidade) => acc + quantidade, 0);

  return somaTotalInicial >= quantity;
};