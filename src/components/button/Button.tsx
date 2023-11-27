import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
import { colors } from './constants'
import { styles } from './styles'

type ButtonProps = {
  label: string
  color?: 'blue' | 'red'
  full?: boolean
} & TouchableOpacityProps

const Button = ({
  full = false,
  label,
  color = 'blue',
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    activeOpacity={.75}
    style={[
      styles.container,
      colors[color].container,
      full && { width: '100%' }
    ]}
    {...props}
  >
    <Text style={[styles.text, colors[color].text]}>{label}</Text>
  </TouchableOpacity>
)


export { Button }