import { createContext, useState, useContext } from 'react'
import { useAsyncStorage } from 'src/hooks'

import type { ReactNode } from 'react'

import { apiMovements } from 'src/services/api'
import { getEventStorage, getMovementsStorage } from 'src/storage/storage'
import { ProductMovementStorage } from 'src/storage/storage.types'

type AuthContextType = {
  user: number | null
  login: (arg0: number) => void;
  logout: () => void
  syncDbMovements: () => Promise<void>
  addProductsMovement: (data: ProductMovementStorage) => Promise<void>
  movements: ProductMovementStorage[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<number | null>(null)
  const [movements, setMovements] = useState<ProductMovementStorage[]>([])

  const { removeItem, setItem } = useAsyncStorage()

  const login = (id: number) => {
    setUser(id)
  }

  const addProductsMovement = async (data: ProductMovementStorage): Promise<void> => {  
    const storageMovements = await getMovementsStorage() || []
    const newMovements = [...storageMovements, data]

    await setItem('movements', newMovements)
    
    setMovements(newMovements)
  }

  const logout = async () => {
    await removeItem('event')
    await removeItem('user')
    await removeItem('arts')
    await removeItem('operators')

    setUser(null)
  }

  const syncDbMovements = async () => {
    const event = await getEventStorage()

    if (!event) return

    const unSyncMovements = (await getMovementsStorage() || []).filter(({ sync }) => !sync)
    const dbMovements = await apiMovements.getMovements({ id_evento: event.id })

    console.log(unSyncMovements)

    await removeItem('movements')

    for (const movement of dbMovements) {
      await addProductsMovement({
        id: movement.id,
        id_evento: event.id,
        id_art: movement.id_arte,
        id_operator: movement.id_operador,
        image: '',
        name_operator: movement.nome_operador,
        quantity: movement.quantidade,
        responsible: movement.responsavel,
        time: movement.app_time,
        type: movement.controle === 'Entrada' ? 'in' : 'out',
        sync: true,
        date: movement.data
      })
    }

    for (const movement of unSyncMovements) {
      await addProductsMovement(movement)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, syncDbMovements, movements, addProductsMovement }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}