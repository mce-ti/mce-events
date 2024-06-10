import { create } from "zustand"

import { useAsyncStorage } from "src/hooks"
import { apiStock } from "src/services/api"
import { getEventStorage, getStockStorage, getStockLimposStorage, getStockRelStorage, getStockInfosStorage } from "src/storage/storage"
import { StockStorage, StockRelStorage, StockInfosStorage, handleStockQuantity } from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type StockState = {
  stock: StockStorage,
  stockLimpos: StockStorage,
  stockRel: StockRelStorage,
  stockInfos: StockInfosStorage,
  syncStock: () => Promise<void>
  syncStockLimpos: () => Promise<void>
  syncStockRel: () => Promise<void>
  syncStockInfos: () => Promise<void>
  handleStockQuantity: (data: handleStockQuantity) => Promise<void>
  setStockLimpos: (value: number) => void
}

export const useStockStore = create<StockState>(set => ({
  stock: [],
  stockLimpos: [],
  stockRel: [],
  stockInfos: {
    estoque_limpo: {},
    estoque_inicial: {}
  },
  syncStock: async () => {
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()

      const dbStock = await apiStock.getStock(event.id)

      const newStock: StockStorage = []

      for (const item of dbStock) {
        newStock.push({
          id: item.id,
          nome: item.nome,
          quantidade: item.quantidade
        })
      }

      await setItem('stock', newStock)

      set(() => ({ stock: newStock }))
    } else {
      const stStock = await getStockStorage()

      set(() => ({ stock: stStock }))
    }
  },
  syncStockLimpos: async () => {
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()

      const dbStock = await apiStock.getStockLimpos(event.id)

      const newStock: StockStorage = []

      for (const item of dbStock) {
        newStock.push({
          id: item.id,
          nome: item.nome,
          quantidade: item.quantidade
        })
      }

      await setItem('stockLimpos', newStock)

      set(() => ({ stockLimpos: newStock }))
    } else {
      const stStock = await getStockLimposStorage()

      set(() => ({ stockLimpos: stStock }))
    }
  },
  syncStockRel: async () => {
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()

      const dbStockRel = await apiStock.getStockRel(event.id)

      const newStockRel: StockRelStorage = []

      for (const item of dbStockRel) {
        newStockRel.push({
          estoque: item.estoque,
          indice: item.indice
        })
      }

      await setItem('stockRel', newStockRel)

      set(() => ({ stockRel: newStockRel }))
    } else {
      const stStockRel = await getStockRelStorage()

      set(() => ({ stockRel: stStockRel }))
    }
  },
  syncStockInfos: async () => {
    const event = await getEventStorage();

    if (!event) return;

    const setItem = useAsyncStorage().setItem; // Obtenha a função setItem fora do escopo do Zustand

    if (await hasNetwork()) {
      
      const dbStockInfos = await apiStock.getStockInfos(event.id);

      const newStockInfos: StockInfosStorage = {
        estoque_limpo: dbStockInfos.estoque_limpo,
        estoque_inicial: dbStockInfos.estoque_inicial
      };

      await setItem('stockInfos', newStockInfos);

      set(() => ({ stockInfos: newStockInfos }));
    } else {
      const stStockInfos = await getStockInfosStorage();

      const convertedStockInfos: StockInfosStorage = {
        estoque_limpo: stStockInfos.estoque_limpo, 
        estoque_inicial: stStockInfos.estoque_inicial
      };

      set(() => ({ stockInfos: convertedStockInfos }));
    }
  },
  handleStockQuantity: async (data: handleStockQuantity) => {
    const { getItem, setItem, removeItem } = useAsyncStorage();

    let stock: StockStorage | null = await getItem('stockLimpos');
    let stockInfos: StockInfosStorage | null = await getItem('stockInfos');
    
    if (!stock) return; 
    
    const dataToUpdate = data; 
    let quantidadeNew = 0;
    let quantidadeAtual = stock.find(item => item.id === dataToUpdate.id_arte)?.quantidade || 0;

    if(dataToUpdate.tipo == 'in') {
      if(!stockInfos) return;

      const estoqueInicial = stockInfos.estoque_inicial[dataToUpdate.id_arte];

      quantidadeNew = quantidadeAtual - dataToUpdate.quantidade;

    } else if(dataToUpdate.tipo == 'out') {
      quantidadeNew = quantidadeAtual + dataToUpdate.quantidade;

      const updatedItem = {
        id_arte: stock.find(item => item.id === dataToUpdate.id_arte)?.id,
        nome: stock.find(item => item.id === dataToUpdate.id_arte)?.nome,
        
        quantidade: quantidadeNew,
      };
      
      const updatedStock = stock.map(item => (item.id === dataToUpdate.id_arte ? updatedItem : item)) as StockStorage;
  
      if(updatedStock) {
        removeItem('stockLimpos')
        
        await setItem('stockLimpos', updatedStock);
  
        set(() => ({ stockLimpos: updatedStock }));
      } else {
        console.log('houve um problema')
      }
    }
  },
  setStockLimpos: (newQuantity: number) => set(state => ({
    stockLimpos: state.stockLimpos.map(item => ({ ...item, quantidade: newQuantity }))
  }))
}))