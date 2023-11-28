import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from "react-native"
import { colors } from './constants'
import { styles } from './styles'

type ButtonProps = {
  label: string
  color?: 'blue' | 'red'
  full?: boolean
  loading?: boolean
} & TouchableOpacityProps

const Button = ({
  full = false,
  label,
  color = 'blue',
  loading,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    activeOpacity={.75}
    style={[
      styles.container,
      colors[color].container,
      full && { width: '100%' },
      props.disabled && { opacity: .6 }
    ]}
    {...props}
  > 
    {loading
      ? <ActivityIndicator color={colors[color].text.color} />
      : <Text style={[styles.text, colors[color].text]}>{label}</Text>}
  </TouchableOpacity>
)

export { Button }