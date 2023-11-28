import { TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from "react-native"
import { colors } from "./constants"

type IconButtonProps = {
  size?: number
  color?: 'blue' | 'red' | 'green'
  outlined?: boolean
} & TouchableOpacityProps

const IconButton = ({ children, size = 40, color = 'blue', outlined = false, ...props }: IconButtonProps) => {

  const style: StyleProp<ViewStyle> = outlined ? {
    borderWidth: 1,
    borderColor: colors[color]
  } : {
    backgroundColor: colors[color]
  }

  return (
    <TouchableOpacity
      style={{
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        ...style
      }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

export { IconButton }