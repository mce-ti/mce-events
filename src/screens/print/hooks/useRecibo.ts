import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { EventStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'

const useRecibo = ({ navigation }: HomeStackRouteScreen<'PrintRecibo'> ) => {
  const [useEvent, setEvent] = useState<EventStorage|null>(null)

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
    useEvent
  }
}

export { useRecibo }