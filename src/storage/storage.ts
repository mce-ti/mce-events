import { useAsyncStorage } from "src/hooks"
import type { ProductMovementStorage } from "./storage.types"

export const addProductsMovement = async (data: ProductMovementStorage): Promise<void> => {
  const { getItem, setItem } = useAsyncStorage()

  const movements: ProductMovementStorage[] = await getItem('movements') || []

  movements.push(data)

  await setItem('movements', movements)
}