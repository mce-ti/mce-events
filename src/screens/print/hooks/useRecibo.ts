import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { EventStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import { useArtsStore } from 'src/stores/artsStore'
import { useStockStore } from 'src/stores'

const useRecibo = ({ navigation }: HomeStackRouteScreen<'PrintRecibo'> ) => {
  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const arts = useArtsStore(state => state.arts);
  const stockRel = useStockStore(state => state.stockRel)

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const eventStorage: EventStorage|null = await getItem('event')

    setEvent(eventStorage)
  }

  const onScreenFocus = () => {    
    loadInfos()
  }

  useEffect(onScreenFocus, [])

  return {
    useEvent,
    arts,
    stockRel
  }
}

export { useRecibo }