import { create } from "zustand"

import { getArtsStorage, getEventStorage } from "src/storage/storage"
import { useAsyncStorage } from "src/hooks"
import { apiArts } from "src/services/api"
import { downloadImage } from "src/utils/file.utils"

import type { ArtStorage } from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type ArtsState = {
  arts: ArtStorage[]
  syncArts: () => Promise<void>
}

export const useArtsStore = create<ArtsState>(set => ({
  arts: [],
  syncArts: async () => {
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()
  
      const dbArts = await apiArts.getArts(event.id)
  
      const newArts: ArtStorage[] = []
  
      for (const art of dbArts) {
        newArts.push({
          id: art.id,
          nome: art.nome,
          medida: art.medida,
          quantidade: art.quantidade,
          valor: art.valor,
          imagem: await downloadImage(art.imagem, `img-${art.id}`)
        })
      }
  
      await setItem('arts', newArts)
  
      set(() => ({ arts: newArts }))
    } else {
      const stArts = await getArtsStorage()

      set(() => ({ arts: stArts }))
    }
  }
}))