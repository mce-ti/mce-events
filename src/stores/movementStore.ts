import { create } from 'zustand'

import { getEventStorage, getMovementsStorage } from 'src/storage/storage'
import { apiMovements } from 'src/services/api'
import { readFile } from 'src/utils/file.utils'
import { useAsyncStorage } from 'src/hooks'
import { ProductMovementStorage } from 'src/storage/storage.types'
import { hasNetwork } from 'src/utils/net'
import { useStockStore } from './stockStore'
import { Alert } from 'react-native'

type MovementSate = {
  movements: ProductMovementStorage[]
  addProductMovement: (data: ProductMovementStorage) => Promise<void>
  sync: () => Promise<void>
  sendStorageData: () => Promise<void>
  calculateTotalStock: () => Promise<void>
  calculateTotalSubStock: () => Promise<void>
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
  
      let dbMovements = await apiMovements.getMovements({ id_evento: event.id })
      const unSyncMovements = (await getMovementsStorage() || []).filter(({ sync }) => !sync)

      if(dbMovements.status == 'error') {
        dbMovements = await apiMovements.getMovements({ id_evento: event.id })

        if(dbMovements.status == 'error') return;
      };
  
      const newMovements: ProductMovementStorage[] = []
  
      await removeItem('movements')
  
      for (const movement of dbMovements.data) {
        newMovements.push({
          id: movement.id,
          id_evento: event.id,
          indice_estoque: movement.indice_estoque,
          id_art: movement.id_arte,
          id_operator: movement.id_operador,
          image: '',
          // assinatura: movement.assinatura,
          name_operator: movement.nome_operador,
          status: movement.status,
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
    let filteredMovements = [];

    if (!event || !unSyncMovements.length) return

    const { removeItem } = useAsyncStorage()

    for (const movement of unSyncMovements) {
      if(!movement.sync) {
        filteredMovements.push({
          id_operador: movement.id_operator,
          indice_estoque: movement.indice_estoque,
          controle: movement.type === 'in' ? 'Entrada' : 'Saída',
          status: movement.status,
          quantidade: movement.quantity,
          caucao: event?.caucao ? 'Sim' : 'Não',
          id_arte: movement.id_art,
          responsavel: movement.responsible,
          assinatura: movement.assinatura ? movement.assinatura : '',
          app_time: movement.time
        });
      }
    }

    if(filteredMovements.length){
      const sendData = await apiMovements.syncMovement(event.id, filteredMovements);

      if(Array.isArray(sendData) && sendData.length === 0) {
        Alert.alert(
          'Houve um problema!',
          'Tivemos um problema ao enviar os dados ao servidor, por favor tente novamente mais tarde!',
          [
            {
              text: 'Entendi'
            },
          ],
          { cancelable: false }
        );
      } else {
        removeItem('movements')
        await get().sync()
      }
    }
  },
  calculateTotalStock: async () => {
    const stockStore = useStockStore.getState();
    let currentStock = stockStore.stockLimpos;
  
    // Obtenha os movimentos não sincronizados de saída ("out") e status 'Limpo'
    const unSyncMovements = (await getMovementsStorage() || [])
      .filter(({ sync, status, type }) => !sync && status === 'Limpo' && type === 'out');
  
    // Atualiza as quantidades no currentStock com base nos movimentos não sincronizados
    unSyncMovements.forEach((movement) => {
      const itemIndex = currentStock.findIndex(item => item.id === movement.id_art);
      
      if (itemIndex !== -1) {
        currentStock[itemIndex].quantidade += movement.quantity;
      }
    });

    stockStore.setStockLimpos(currentStock);
  },
  calculateTotalSubStock: async () => {
    const stockStore = useStockStore.getState();
    const unSyncMovements = (await getMovementsStorage() || []).filter(({ sync, status }) => !sync && status === 'Limpo');
    let finalCalcStock;

    Object.keys(stockStore.stockInfos.estoque_limpo).forEach((indice_estoque) => {
      const currentStock = stockStore.stockInfos.estoque_limpo[indice_estoque];
  
      currentStock.forEach(item => {
        const movimentosDoItem = unSyncMovements.filter(movement => movement.id_art === item.id_arte);
  
        item.quantidade = item.quantidade_inicial;
  
        movimentosDoItem.forEach(movement => {
          if (movement.type === 'in') {
            item.quantidade -= movement.quantity; 
          } else if (movement.type === 'out') {
            item.quantidade += movement.quantity; 
          }
        });
      });

      finalCalcStock = currentStock;
    });

    if(finalCalcStock) stockStore.setStockInfos(finalCalcStock);
  }
}))