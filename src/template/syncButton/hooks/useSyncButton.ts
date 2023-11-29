import { useState, useRef } from "react"
import { Animated } from "react-native"

import { useAsyncStorage, useInterval } from "src/hooks"

import type { ProductMovementStorage } from "src/storage/storage.types"

const useSyncButton = () => {
  const [hasSync, setHasSync] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const [spinAnimation] = useState(new Animated.Value(0))

  useInterval(async () => {
    const { getItem } = useAsyncStorage()

    const movements: ProductMovementStorage[] = await getItem('movements') || []

    setHasSync(!!movements.length)
  }, 5000)

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
    anim.start()
    setIsSyncing(true)

    await new Promise(r => setTimeout(r, 5000))

    anim.stop()
    setIsSyncing(false)
  }

  const rotate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg']
  })

  return {
    hasSync,
    isSyncing,
    rotate,
    sync
  }
}

export { useSyncButton }