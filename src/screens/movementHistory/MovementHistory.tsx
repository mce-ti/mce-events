import { useEffect, useState } from "react"
import { Text, StyleSheet, View } from "react-native"
import { Divider, Table } from "src/components"
import { useAsyncStorage } from "src/hooks"
import { ProductMovementStorage } from "src/storage/storage.types"
import { Layout } from "src/template"

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import type { RootDrawerScreen } from "src/routes/routes.types"

const MovementHistory = ({ navigation }: RootDrawerScreen<'MovementHistory'>) => {
  const [movements, setMovements] = useState<ProductMovementStorage[]>([])

  const { getItem } = useAsyncStorage()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const productMovements: ProductMovementStorage[] = await getItem('movements') || []
  
      setMovements(productMovements)
    })

    return unsubscribe
  }, [navigation])

  return (
    <Layout>
      <Text style={styles.title}>Histórico</Text>

      <Divider opacity={0} />

      <View style={styles.table}>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 2 }]}>Bar</Text>
          <Text style={[styles.th, { flex: 2 }]}>Tipo</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Qntd.</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Sinc.</Text>
        </View>

        {movements.map((movement, idx) => (
          <View
            key={`movement-${movement.time || idx}`}
            style={[styles.tr, { backgroundColor: (idx % 2 ? '#e0f2fe': '#fff') }]}
          >
            <View style={[styles.td, { flex: 2 }]}>
              <Text style={styles.text}>{movement.name_operator}</Text>
            </View>
            <View style={[styles.td, { flex: 2 }]}>
              <Text style={[styles.typeTag, movement.type === 'in' ? styles.typeTagIn : styles.typeTagOut]}>{movement.type === 'in' ? 'Entrada' : 'Saída'}</Text>
            </View>
            <View style={[styles.td, { flex: 1, justifyContent: 'flex-end'}]}>
              <Text style={styles.text}>{movement.quantity}</Text>
            </View>
            <View style={[styles.td, { alignItems: 'center', justifyContent: 'center' }]}>
              {movement.sync ? (
                <MaterialIcons name="check-circle" size={20} color="#16a34a" />
              ): (
                <FontAwesome5 name="exclamation-circle" size={20} color="orange" />
              )}
            </View>
          </View>
        ))}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  table: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderBlockColor: '#e5e7eb'
  },
  thead: {
    flexDirection: 'row',
    backgroundColor: '#172554',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  th: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '600',
    flex: 1
  },
  tr: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    // height: 40,
    alignItems: 'center'
  },
  td: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    color: '#172554'
  },
  typeTag: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    fontWeight: '500',
    borderRadius: 2
  },
  typeTagIn: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  typeTagOut: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  }
})

export { MovementHistory }