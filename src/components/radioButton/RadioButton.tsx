import { TouchableOpacity, TouchableOpacityProps, Animated } from "react-native"
import { useRadioButton } from './hooks/useRadioButton'

type IconButtonProps = {
  size?: number
  value: string | number | boolean,
  currentValue: string | number | boolean | null
} & TouchableOpacityProps

const RadioButton = ({ size = 24, value, currentValue, ...props }: IconButtonProps) => {
  
  const { accentAnimatedStyle } = useRadioButton({ value, currentValue })

  const accentSize = size - 8

  return (
    <TouchableOpacity
      style={{
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: '#6b728090',
      }}
      {...props}
    >
      <Animated.View
        style={{
          height: accentSize,
          width: accentSize,
          borderRadius: accentSize / 2,
          ...accentAnimatedStyle
        }}
      />
    </TouchableOpacity>
  )
}

export { RadioButton }