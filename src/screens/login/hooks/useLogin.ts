import { useEffect, useState } from 'react'
import { useAsyncStorage } from "../../../hooks"
import { apiAuth } from '../../../services/api'

import type { NavigationProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../../routes/stack.routes'
import type { UserStorage } from '../../../storage/storage.types'

type useLoginProps = {
  navigation: NavigationProp<RootStackParamList, 'Login'>
}

const useLogin = ({ navigation }: useLoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { getItem, setItem } = useAsyncStorage()

  const singIn = async () => {
    setIsLoading(true)

    const response = await apiAuth.login({ username, password })

    console.log('response', response)

    if ('message' in response) {
      setIsLoading(false)
      alert(response.message)
      return;
    }

    await setItem('event', response.evento)
    await setItem('user', response.usuario)
    await setItem('arts', response.artes)
    await setItem('operators', response.operadores)

    navigation.navigate('Home')
  }

  const verifyUserIsLogged = async () => {
    const user: UserStorage|null = await getItem('user')

    console.log('user', user)

    user && navigation.navigate('Home')
  }

  useEffect(() => {
    verifyUserIsLogged()
  }, [])

  return {
    username,
    setUsername,
    password,
    setPassword,
    singIn,
    isLoading
  }
}

export { useLogin }