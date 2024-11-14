import { useState, useRef, useEffect } from "react"
import { Alert, Animated } from "react-native"
import { useAuth } from "src/context/AuthContext"

import { useAsyncStorage } from "src/hooks"
import { apiAuth } from "src/services/api"
import { UserStorage } from "src/storage/storage.types"

import { useMovementStore, useOperatorsStore } from "src/stores"
import { useArtsStore } from "src/stores/artsStore"
import { useStockStore } from "src/stores/stockStore"
import { hasNetwork } from "src/utils/net"

interface LoginRequest {
  username: string;
  password: string;
}

const useSyncButton = () => {
  const [isSyncing, setIsSyncing] = useState(false)

  const [spinAnimation] = useState(new Animated.Value(0))

  const movements = useMovementStore(state => state.movements)
  const sendStorageData = useMovementStore(state => state.sendStorageData)
  
  let hasSync = !!movements.filter(({ sync }) => !sync).length
 
  const syncMovement = useMovementStore(state => state.sync)
  const syncOperators = useOperatorsStore(state => state.syncOperators)
  const syncArts = useArtsStore(state => state.syncArts)
  const syncStock = useStockStore(state => state.syncStock)
  const syncStockLimpos = useStockStore(state => state.syncStockLimpos)
  const syncStockInfos = useStockStore(state => state.syncStockInfos)

  const { getItem, removeItem } = useAsyncStorage()

  const { logout } = useAuth();

  const anim = useRef(Animated.loop(
    Animated.timing(spinAnimation,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    )
  )).current

  const sync = async () => {
    // hasSync = !!movements.filter(({ sync }) => !sync).length
    // if (isSyncing || !hasSync) return;
    if (isSyncing) return;

    anim.start()
    setIsSyncing(true)

    const hasNet = await hasNetwork()

    if (hasNet) {
      const user: UserStorage|null = await getItem('user')
      
      if(user) {
        const dataApiUser: LoginRequest = {username : user.login, password : user.senha}

        const response = await apiAuth.login(dataApiUser)

        const { status, http_code } = response;

        if ('message' in response && status === "error" && (http_code === 400 || http_code === 401)) {
          Alert.alert(
            'Houve um problema!',
            'Parece que suas credencias de acesso estão desatualizadas. Tente fazer login novamente',
            [
              {
                text: 'Entendi',
                onPress: () => {
                  logout();
                }
              },
            ],
            { cancelable: false }
          );

          removeItem('user');
  
          anim.reset();
          setIsSyncing(false);
          return;
        }

        if(http_code === 500 || http_code === 504) {
          Alert.alert(
            'Houve um problema!',
            'A conexão com o servidor está instável, por favor, tente mais tarde.',
            [
              {
                text: 'Entendi'
              },
            ],
            { cancelable: false }
          );

          anim.reset();
          setIsSyncing(false);
          return;
        }

        await syncMovement()
        await sendStorageData()
        await syncOperators()
        await syncArts()
        await syncStock()
        await syncStockLimpos()
        await syncStockInfos()
      } 
    } else {
      alert('Sem conexão com a internet')
    }

    anim.reset()
    setIsSyncing(false)
  }

  const rotate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg']
  })

  useEffect(() => {

  }, [])

  return {
    hasSync,
    isSyncing,
    rotate,
    sync
  }
}

export { useSyncButton }