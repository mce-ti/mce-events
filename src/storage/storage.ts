import { useAsyncStorage } from "src/hooks"
import type { ArtStorage, EventStorage, OperatorStorage, ProductMovementStorage, StockStorage, QrCodeStorage } from "./storage.types"

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
  const { getItem } = useAsyncStorage()

  const movements: ProductMovementStorage[] = await getItem('movements') || []

  return movements
}

export const getArtsStorage = async () => {
  const { getItem } = useAsyncStorage()

  const arts: ArtStorage[] = await getItem('arts') || []

  return arts
}

export const getStockStorage = async () => {
  const { getItem } = useAsyncStorage()

  const stock: StockStorage = await getItem('stock') || []

  return stock
}

export const getQrCodesStorage = async () => {
  const { getItem } = useAsyncStorage()

  const qrCodes: QrCodeStorage[] = await getItem('qrCodes') || []

  return qrCodes
}