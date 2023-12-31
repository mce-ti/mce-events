import { createContext, useState, useContext } from 'react'
import { useAsyncStorage } from 'src/hooks'

import { apiOperators } from 'src/services/api'
import { getEventStorage } from 'src/storage/storage'

import type { ReactNode } from 'react'
import type { OperatorStorage } from 'src/storage/storage.types'

type AuthContextType = {
  user: number | null
  login: (arg0: number) => void;
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<number | null>(null)

  const { removeItem } = useAsyncStorage()

  const login = (id: number) => {
    setUser(id)
  }

  const logout = async () => {
    await removeItem('event')
    await removeItem('user')
    await removeItem('arts')
    await removeItem('stock')
    await removeItem('operators')

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}>
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