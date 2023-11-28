import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { OperatorStorage } from 'src/storage/storage.types'
import type { RootStackNavigation } from 'src/routes/stack.routes'

const useHome = ({ navigation }: RootStackNavigation<'Home'> ) => {
  const [operators, setOpreators] = useState<OperatorStorage[]>([])

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const operatorsStorage: OperatorStorage[] = await getItem('operators') || []

    setOpreators(operatorsStorage)
  }

  const onScreenFocus = () => {    
    const unsubscribe = navigation.addListener('focus', () => {
      loadInfos()

      navigation.canGoBack() && navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    });

    return unsubscribe
  }

  useEffect(() => {
    
    return onScreenFocus();
  }, [])

  return {
    operators
  }
}

export { useHome }