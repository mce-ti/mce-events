import { create } from "zustand"

import { useAsyncStorage } from "src/hooks"
import { apiStock } from "src/services/api"
import { getEventStorage, getStockStorage, getStockRelStorage } from "src/storage/storage"
import { StockStorage, StockRelStorage} from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type StockState = {
  stock: StockStorage,
  stockRel: StockRelStorage,
  syncStock: () => Promise<void>
  syncStockRel : () => Promise<void>
}

export const useStockStore = create<StockState>(set => ({
  stock: [],
  stockRel: [],
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
  }
}))