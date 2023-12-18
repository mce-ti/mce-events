import { useEffect, useState } from 'react'
import { AwesomeAlertProps, useAsyncStorage } from "src/hooks"
import { apiAuth } from 'src/services/api'

import type { UserStorage } from 'src/storage/storage.types'

import { useFormik } from 'formik'
import { useAuth } from 'src/context/AuthContext'
import { useMovementStore, useOperatorsStore } from 'src/stores'
import { useArtsStore } from 'src/stores/artsStore'
import { useStockStore } from 'src/stores/stockStore'

type useLoginProps = {
  showAlert: (arg0: AwesomeAlertProps) => void
}

const useLogin = ({ showAlert }: useLoginProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { getItem, setItem } = useAsyncStorage()
  const { login } = useAuth()

  const syncMovements = useMovementStore(state => state.sync)
  const syncOperators = useOperatorsStore(state => state.syncOperators)
  const syncArts = useArtsStore(state => state.syncArts)
  const syncStock = useStockStore(state => state.syncStock)

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

      await syncArts()
      await syncMovements()
      await syncOperators()
      await syncStock()

      login(response.usuario.id)
    }
  })

  const verifyUserIsLogged = async () => {
    const user: UserStorage|null = await getItem('user')

    await syncArts()
    await syncMovements()
    await syncOperators()
    await syncStock()

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