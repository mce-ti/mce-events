import { create } from "zustand"

import { useAsyncStorage } from "src/hooks"
import { apiStock } from "src/services/api"
import { getEventStorage, getStockStorage } from "src/storage/storage"
import { StockStorage } from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type StockState = {
  stock: StockStorage,
  syncStock: () => Promise<void>
}

export const useStockStore = create<StockState>(set => ({
  stock: [],
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
  }
}))