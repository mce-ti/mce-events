import { create } from 'zustand'

import { getEventStorage, getMovementsStorage } from 'src/storage/storage'
import { apiMovements } from 'src/services/api'
import { readFile } from 'src/utils/file.utils'
import { useAsyncStorage } from 'src/hooks'
import { ProductMovementStorage } from 'src/storage/storage.types'
import { hasNetwork } from 'src/utils/net'

type MovementSate = {
  movements: ProductMovementStorage[]
  addProductMovement: (data: ProductMovementStorage) => Promise<void>
  sync: () => Promise<void>
  sendStorageData: () => Promise<void>
}

export const useMovementStore = create<MovementSate>((set, get) => ({
  movements: [],
  addProductMovement: async (data: ProductMovementStorage): Promise<void> => {
    const { setItem } = useAsyncStorage()

    const storageMovements = await getMovementsStorage() || []
    const newMovements = [...storageMovements, data]

    await setItem('movements', newMovements)

    set(() => ({ movements: newMovements }))
  },
  sync: async () => {
    const event = await getEventStorage()

    if (!event) return
    
    if (await hasNetwork()) {
      const { removeItem, setItem } = useAsyncStorage()
  
      const dbMovements = await apiMovements.getMovements({ id_evento: event.id })
      const unSyncMovements = (await getMovementsStorage() || []).filter(({ sync }) => !sync)
  
      const newMovements: ProductMovementStorage[] = []
  
      await removeItem('movements')
  
      for (const movement of dbMovements) {
        newMovements.push({
          id: movement.id,
          id_evento: event.id,
          indice_estoque: movement.indice_estoque,
          id_art: movement.id_arte,
          id_operator: movement.id_operador,
          image: '',
          name_operator: movement.nome_operador,
          quantity: movement.quantidade,
          responsible: movement.responsavel,
          time: movement.app_time,
          type: movement.controle === 'Entrada' ? 'in' : 'out',
          sync: true,
          date: movement.data
        })
      }
  
      for (const movement of unSyncMovements) {
        newMovements.push(movement)
      }
  
      await setItem('movements', newMovements)
  
      set(() => ({ movements: newMovements }))
    } else {
      const stMovements = await getMovementsStorage()

      set(() => ({ movements: stMovements }))
    }
  },
  sendStorageData: async () => {
    const event = await getEventStorage()
    const unSyncMovements = (await getMovementsStorage() || []).filter(({ sync }) => !sync)

    if (!event || !unSyncMovements.length) return

    const { removeItem } = useAsyncStorage()

    for (const movement of unSyncMovements) {
      await apiMovements.syncMovement({
        id_evento: event.id,
        id_operador: movement.id_operator,
        indice_estoque: movement.indice_estoque,
        controle: movement.type === 'in' ? 'Entrada' : 'Saída',
        quantidade: movement.quantity,
        caucao: event?.caucao ? 'Sim' : 'Não',
        id_arte: movement.id_art,
        responsavel: movement.responsible,
        // foto: await readFile(movement.image),
        app_time: movement.time
      })

      removeItem('movements')
    }
    
    await get().sync()
  }
}))