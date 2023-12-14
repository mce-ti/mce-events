import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { EventStorage, OperatorStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import { useAuth } from 'src/context/AuthContext'
import { useOperatorsStore } from 'src/stores'

const useHome = ({ navigation }: HomeStackRouteScreen<'Home'> ) => {
  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  const operators = useOperatorsStore(state => state.operators)

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const eventStorage: EventStorage|null = await getItem('event')

    setEvent(eventStorage)
  }

  const onScreenFocus = () => {    
    loadInfos()

    const unsubscribe = navigation.addListener('focus', () => {
      navigation.canGoBack() && navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    });

    return unsubscribe
  }

  useEffect(onScreenFocus, [])

  return {
    operators,
    useEvent,
    searchValue,
    setSearchValue
  }
}

export { useHome }