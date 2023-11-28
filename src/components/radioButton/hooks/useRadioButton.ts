import { useEffect, useState } from 'react'
import { Animated } from "react-native"

type useRadioButtonProps = {
  value: string | number | boolean,
  currentValue: string | number | boolean | null
}

const useRadioButton = ({ currentValue, value }: useRadioButtonProps) => {
  const [accentAnimation] = useState(new Animated.Value(0))
  useEffect(() => {
    if (currentValue === value) {
      Animated.timing(accentAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(accentAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()
    }
  }, [currentValue, value])

  const accentBoxInterpolation = accentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange:["rgba(37, 99, 235, 0)" , "rgba(37, 99, 235, 1)"]
  })

  const accentAnimatedStyle = {
    backgroundColor: accentBoxInterpolation
  }

  return {
    accentAnimatedStyle,
  }
}

export { useRadioButton }