import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { EventStorage, OperatorStorage } from 'src/storage/storage.types'
import type { RootStackNavigation } from 'src/routes/routes'

const useHome = ({ navigation }: RootStackNavigation<'Home'> ) => {
  const [operators, setOpreators] = useState<OperatorStorage[]>([])
  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const operatorsStorage: OperatorStorage[] = await getItem('operators') || []
    const eventStorage: EventStorage|null = await getItem('event')

    setEvent(eventStorage)
    setOpreators(operatorsStorage)

    console.log(operatorsStorage)
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