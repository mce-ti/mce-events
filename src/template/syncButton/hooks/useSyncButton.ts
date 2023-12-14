import { useState, useRef, useEffect } from "react"
import { Animated } from "react-native"

import { useMovementStore, useOperatorsStore } from "src/stores"
import { useArtsStore } from "src/stores/artsStore"
import { hasNetwork } from "src/utils/net"

const useSyncButton = () => {
  const [isSyncing, setIsSyncing] = useState(false)

  const [spinAnimation] = useState(new Animated.Value(0))

  const movements = useMovementStore(state => state.movements)
  const sendStorageData = useMovementStore(state => state.sendStorageData)
  
  const hasSync = !!movements.filter(({ sync }) => !sync).length
  
  const syncOperators = useOperatorsStore(state => state.syncOperators)
  const syncArts = useArtsStore(state => state.syncArts)

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
    if (isSyncing) return;
    
    anim.start()
    setIsSyncing(true)

    const hasNet = await hasNetwork()

    if (hasNet) {
      await sendStorageData()
      await syncOperators()
      await syncArts()
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