import { useAsyncStorage } from "src/hooks"
import type { EventStorage, OperatorStorage, ProductMovementStorage } from "./storage.types"

export const addProductsMovement = async (data: ProductMovementStorage): Promise<void> => {
  const { getItem, setItem } = useAsyncStorage()

  const movements: ProductMovementStorage[] = await getItem('movements') || []

  movements.push(data)

  await setItem('movements', movements)
}

export const getEventStorage = async () => {
  const { getItem } = useAsyncStorage()

  const event: EventStorage | null = await getItem('event')

  return event
}

export const getOperatorsStorage = async () => {
  const { getItem } = useAsyncStorage()

  const operators: OperatorStorage[] = await getItem('operators') || []

  return operators
}

export const getMovementsStorage = async () => {
  const { getItem, removeItem } = useAsyncStorage()

  // await removeItem('movements')

  const movements: ProductMovementStorage[] = await getItem('movements') || []

  return movements
}