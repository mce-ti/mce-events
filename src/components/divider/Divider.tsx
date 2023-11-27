import { View } from "react-native"

type DividerProps = {
  size?: number
  space?: number
  opacity?: number
}

const Divider = ({ size = 1, space = 10, opacity = .4 }: DividerProps) => (
  <View style={{
    borderBottomWidth: size,
    marginVertical: space,
    borderColor: '#4b5563',
    opacity
  }} />
)

export { Divider }