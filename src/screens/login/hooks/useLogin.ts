import { useEffect, useState } from 'react'
import { AwesomeAlertProps, useAsyncStorage } from "src/hooks"
import { apiAuth } from 'src/services/api'

import type { UserStorage } from 'src/storage/storage.types'

import { useFormik } from 'formik'
import { useAuth } from 'src/context/AuthContext'

type useLoginProps = {
  showAlert: (arg0: AwesomeAlertProps) => void
}

const useLogin = ({ showAlert }: useLoginProps) => {
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      setIsLoading(true)

      const response = await apiAuth.login(values)

      if ('message' in response) {
        setIsLoading(false)
        showAlert({
          show: true,
          title: 'Erro',
          message: response.message,
          confirmText: 'Entendi',
        })

        return;
      }

      await setItem('event', response.evento)
      await setItem('user', response.usuario)
      await setItem('arts', response.artes)
      await setItem('operators', response.operadores)

      login(response.usuario.id)
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  const { getItem, setItem } = useAsyncStorage()

  const verifyUserIsLogged = async () => {
    const user: UserStorage|null = await getItem('user')

    user && login(user.id)
  }

  useEffect(() => {
    verifyUserIsLogged()
  }, [])

  return {
    isLoading,
    formik
  }
}

export { useLogin }