import { create } from "zustand"

import { useAsyncStorage } from "src/hooks"
import { apiStock } from "src/services/api"
import { getEventStorage, getStockStorage, getStockLimposStorage, getStockRelStorage } from "src/storage/storage"
import { StockStorage, StockRelStorage, StockInfosResponse} from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type StockState = {
  stock: StockStorage,
  stockLimpos: StockStorage,
  stockRel: StockRelStorage,
  stockInfos: StockInfosResponse | null,
  syncStock: () => Promise<void>
  syncStockLimpos: () => Promise<void>
  syncStockRel : () => Promise<void>
  syncStockInfos : () => Promise<void>
}

export const useStockStore = create<StockState>(set => ({
  stock: [],
  stockLimpos: [],
  stockRel: [],
  stockInfos: null,
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
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()
  
      const dbStockInfos = await apiStock.getStockRel(event.id)
  
      const newStockInfos: StockInfosResponse = []
  
      for (const item of dbStockInfos) {
        // newStockInfos.push({
        //   estoque: item.estoque,
        //   indice: item.indice
        // })
      }
  
      await setItem('stockInfos', newStockInfos)
  
      set(() => ({ stockInfos: newStockInfos }))
    } else {
      const stStockInfos = await getStockRelStorage()

      set(() => ({ stockInfos: stStockInfos }))
    }
  }
}))