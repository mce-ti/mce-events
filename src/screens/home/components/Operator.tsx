import { StyleSheet, View, Text } from "react-native"
import { IconButton } from "../../../components"

import Ionicons from '@expo/vector-icons/Ionicons';

type OperatorProps = {
  entry: () => void
  output: () => void
  name: string
  color: string | null
  localizacao?: string | null
}

const Operator = ({ entry, output, name, localizacao = '', color }: OperatorProps) => {

  return (
    <View style={styles.container}>
      <View style={[styles.nameContent, { backgroundColor: color || '#1f2937' }]}>
        <Text style={styles.name}>{name}</Text>
        {localizacao && <Text style={styles.location}>{localizacao}</Text>}
      </View>

      <View>
        <IconButton size={44} color="green" outlined onPress={entry}>
          <Ionicons name="caret-up" size={26} color="#16a34a" />
        </IconButton>
      </View>

      <View>
        <IconButton size={44} color="red" outlined onPress={output}>
          <Ionicons name="caret-down" size={26} color="#dc2626" />
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
  nameContent: {
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 44,
    flex: 1,
    justifyContent: 'center'
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white'
  },
  location: {
    fontWeight: '400',
    fontSize: 10,
    color: 'white'
  }
})

export { Operator }