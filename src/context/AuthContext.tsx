import { createContext, useState, useContext } from 'react'
import { useAsyncStorage } from 'src/hooks'

import type { ReactNode } from 'react'
import { Alert } from 'react-native'

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
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Sim",
          onPress: async () => {
            await removeItem('event')
            await removeItem('user')
            await removeItem('arts')
            await removeItem('stock')
            await removeItem('operators')
  
            setUser(null)
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    )
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