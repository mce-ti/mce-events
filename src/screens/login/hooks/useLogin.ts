import { useEffect, useState } from 'react'
import { AwesomeAlertProps, useAsyncStorage } from "src/hooks"
import { apiAuth, apiMovements } from 'src/services/api'

import type { UserStorage } from 'src/storage/storage.types'

import { useFormik } from 'formik'
import { useAuth } from 'src/context/AuthContext'
import { addProductsMovement } from 'src/storage/storage'

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

      await removeItem('movements')

      try {
        const updatedMovements = await apiMovements.getMovements({ id_evento: response.evento.id })

        console.log('updatedMovements', updatedMovements)
  
        for (const movement of updatedMovements) {
          const operator = response.operadores.find(op => op.id == movement.id_operador)
  
          await addProductsMovement({
            id_art: movement.id_arte,
            id_operator: movement.id_operador,
            image: '',
            name_operator: operator?.nome || '',
            quantity: movement.quantidade,
            responsible: movement.responsavel,
            time: 0,
            type: movement.controle === 'Entrada' ? 'in' : 'out',
            sync: true
          })
        }
      } catch (error) {
        console.log(error)
      }

      console.log(await getItem('movements'))


      login(response.usuario.id)
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  const { getItem, setItem, removeItem } = useAsyncStorage()

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