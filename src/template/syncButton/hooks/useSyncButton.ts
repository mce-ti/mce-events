import { useState, useRef } from "react"
import { Animated } from "react-native"

import { useAsyncStorage, useInterval } from "src/hooks"
import { apiMovements } from "src/services/api"
import { SyncMovementsRequest } from "src/services/api/movements/movements.types"
import { addProductsMovement, getEventStorage, getMovementsStorage, getOperatorsStorage } from "src/storage/storage"
import { readFile } from "src/utils/file.utils"

const useSyncButton = () => {
  const [hasSync, setHasSync] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const [spinAnimation] = useState(new Animated.Value(0))

  const { removeItem } = useAsyncStorage()

  useInterval(async () => {
    const movements = await getMovementsStorage()
    const unSyncMovements = movements.filter(({ sync }) => !sync)

    setHasSync(!!unSyncMovements.length)
  }, 5000, true)

  const anim = useRef(Animated.loop(
    Animated.timing(spinAnimation,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    )
  )).current

  const sync = async () => {
    anim.start()
    setIsSyncing(true)

    const movements = await getMovementsStorage()
    const event = await getEventStorage()
    const operators = await getOperatorsStorage()

    const unSyncMovements = movements.filter(({ sync }) => !sync)

    if (event && unSyncMovements.length) {
      const requestData: SyncMovementsRequest = []
  
      for (const movement of unSyncMovements) {
        requestData.push({
          id_evento: event.id,
          id_operador: movement.id_operator,
          controle: movement.type === 'in' ? 'Entrada' : 'Saída',
          quantidade: movement.quantity,
          caucao: event?.caucao ? 'Sim' : 'Não',
          id_arte: movement.id_art,
          responsavel: movement.responsible,
          foto: await readFile(movement.image),
          app_time: movement.time
        })
      }
  
      if (await apiMovements.syncMovements([])) {
        await removeItem('movements')
  
        const updatedMovements = await apiMovements.getMovements({ id_evento: event.id })
  
        for (const movement of updatedMovements) {
          const operator = operators.find(op => op.id == movement.id_operador)
  
          await addProductsMovement({
            id_art: movement.id_arte,
            id_operator: movement.id_operador,
            image: '',
            name_operator: operator?.nome || '',
            quantity: movement.quantidade,
            responsible: movement.responsavel,
            time: movement.app_time ? parseInt(movement.app_time?.toString?.()) : 0,
            type: movement.controle === 'Entrada' ? 'in' : 'out',
            sync: true
          })
        }
      }
    }

    anim.reset()
    setIsSyncing(false)
    setHasSync(false)
  }

  const rotate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg']
  })

  return {
    hasSync,
    isSyncing,
    rotate,
    sync
  }
}

export { useSyncButton }