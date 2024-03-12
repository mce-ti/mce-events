import { create } from "zustand"

import { getEventStorage, getQrCodesStorage } from "src/storage/storage"
import { useAsyncStorage } from "src/hooks"
import { apiQrCode } from "src/services/api"

import type { QrCodeStorage } from "src/storage/storage.types"
import { hasNetwork } from "src/utils/net"

type QrCodesState = {
  qrCodes: QrCodeStorage[]
  addQrCode: (data: QrCodeStorage) => Promise<void>
  sendStorageData: () => Promise<void>
  verifyAsyncData: () => Promise<void>
  removeAllQrCodes: () => Promise<void>
  sync: () => Promise<void>
}

export const useQrCodeStore = create<QrCodesState>((set, get) => ({
  qrCodes: [],
  addQrCode: async (data: QrCodeStorage): Promise<void> => {
    const event = await getEventStorage()
    if (!event) return

    const { setItem } = useAsyncStorage()

    const storageQrCodes = await getQrCodesStorage() || []
    const dataQrcode = {id_evento : event.id, codigo : data.codigo}
    const newQrCode = [...storageQrCodes, dataQrcode]
  
    await setItem('qrCodes', newQrCode)

    set(() => ({ qrCodes : newQrCode }))
  },
  sendStorageData: async () => {
    const event = await getEventStorage()
    const unSyncQrodes = await getQrCodesStorage() || [];

    if (!event || !unSyncQrodes.length) return

    const { removeItem } = useAsyncStorage()
  
    for (const qrCode of unSyncQrodes) {
      console.log(qrCode)
      await apiQrCode.syncQrCode(event.id, qrCode.codigo)

      removeItem('qrCodes')
    }

    set(() => ({ qrCodes: [] }))
  },
  verifyAsyncData: async () => {
    const event = await getEventStorage()
    const unSyncQrodes = await getQrCodesStorage() || [];

    if (!event || !unSyncQrodes.length) return;

  },
  removeAllQrCodes: async () => {
    removeItem('qrCodes')
    set(() => ({ qrCodes: [] }))
  },
  sync: async () => {
    const event = await getEventStorage()
    const unSyncQrodes = await getQrCodesStorage() || [];

    if (!event || !unSyncQrodes.length) return

    set(() => ({ qrCodes: unSyncQrodes }))
  }
}))