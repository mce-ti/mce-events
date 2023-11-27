import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import { Button, IconButton } from "../../../components"

import Ionicons from '@expo/vector-icons/Ionicons';

type OperatorProps = {
  entry: () => void
  output: () => void
}

const Operator = ({ entry, output }: OperatorProps) => {

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>Operador 1</Text>
      </View>
      <View>
        <IconButton color="green" outlined onPress={entry}>
          <Ionicons name="arrow-up" size={20} color="#16a34a" />
        </IconButton>
      </View>
      <View>
        <IconButton color="red" outlined onPress={output}>
          <Ionicons name="arrow-down" size={20} color="#dc2626" />
        </IconButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#d1d5db'
  },
  name: {
    fontWeight: '600',
    fontSize: 16
  }
})

export { Operator }