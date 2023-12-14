import { create } from 'zustand'

import { getEventStorage, getOperatorsStorage } from 'src/storage/storage'
import { useAsyncStorage } from 'src/hooks'
import { apiOperators } from 'src/services/api'
import { hasNetwork } from 'src/utils/net'

import type { OperatorStorage } from 'src/storage/storage.types'
type OperatorsState = {
  operators: OperatorStorage[]
  syncOperators: () => Promise<void>
}

export const useOperatorsStore = create<OperatorsState>((set, get) => ({
  operators: [],
  syncOperators: async () => {
    const event = await getEventStorage()

    if (!event) return

    if (await hasNetwork()) {
      const { setItem } = useAsyncStorage()

      const dbOperators = await apiOperators.getOperators(event.id)
  
      setItem('operators', dbOperators)

      set(() => ({ operators: dbOperators }))
    } else {
      const stOperators = await getOperatorsStorage()
      set(() => ({ operators: stOperators }))
    }
  }
}))