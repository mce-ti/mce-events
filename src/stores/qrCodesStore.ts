import { create } from "zustand"

import { getEventStorage, getQrCodesStorage } from "src/storage/storage"
import { useAsyncStorage } from "src/hooks"
import { apiQrCode } from "src/services/api"

import type { QrCodeStorage, UserStorage } from "src/storage/storage.types"
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
    const dataQrcode = { id_evento: event.id, codigo: data.codigo, quantidade: data.quantidade, id_impressora: data.id_impressora }
    const newQrCode = [dataQrcode, ...storageQrCodes]

    await setItem('qrCodes', newQrCode)

    set(() => ({ qrCodes: newQrCode }))
  },
  sendStorageData: async () => {
    const event = await getEventStorage()
    const unSyncQrodes = await getQrCodesStorage() || [];

    if (!event || !unSyncQrodes.length) return

    const { removeItem } = useAsyncStorage()

    for (const qrCode of unSyncQrodes) {
 
      await apiQrCode.syncQrCode(event.id, qrCode.codigo, qrCode.quantidade, qrCode.id_impressora)

      removeItem('qrCodes')
    }

    await get().sync()
  },
  verifyAsyncData: async () => {
    const event = await getEventStorage()
    const unSyncQrodes = await getQrCodesStorage() || [];

    if (!event || !unSyncQrodes.length) return;

  },
  removeAllQrCodes: async () => {
    const { removeItem } = useAsyncStorage()
    // removeItem('qrCodes')
    // set(() => ({ qrCodes: [] }))
  },
  sync: async () => {
    const event = await getEventStorage();
    const { getItem, removeItem } = useAsyncStorage();
    const storedUser: UserStorage | null = await getItem('user');

    if (!storedUser || !event) return

    const id_impressora = storedUser.id_impressora;

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage();

      const dbQrCodes = await apiQrCode.getQrcodes(event.id, id_impressora);
      const unSyncQrodes = (await getQrCodesStorage() || []).filter(({ sync }) => !sync)
      const newQrCode: QrCodeStorage[] = [];

      await removeItem('qrCodes')

      for (const item of dbQrCodes) {
        newQrCode.push({
          id_evento: item.id_evento,
          codigo: item.codigo,
          quantidade: item.quantidade,
          id_impressora: item.id_impressora,
          data: item.data,
          sync: true
        });
      }

      for (const qrCode of unSyncQrodes) {
        newQrCode.unshift(qrCode)
      }

      await setItem('qrCodes', newQrCode);

      set(() => ({ qrCodes: newQrCode }));
    } else {
      const stQrCodes = await getQrCodesStorage();

      set(() => ({ qrCodes: stQrCodes }));
    }
  }
}))