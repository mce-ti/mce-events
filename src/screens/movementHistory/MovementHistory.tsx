import { Text, View } from "react-native"
import { Divider } from "src/components"
import { Layout } from "src/template"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { formatDBDateTime, formatTimeToDateTime } from "src/utils/date.utils"
import { useMovementStore } from "src/stores"
import { styles } from "./styles"

import type { RootDrawerScreen } from "src/routes/routes.types"

const MovementHistory = ({ navigation }: RootDrawerScreen<'MovementHistory'>) => {
  const movementsInStore = useMovementStore(state => state.movements)

  const movements = movementsInStore.sort((a, b) => {
    const d1 = a.date ? new Date(a.date).getTime() : a.time
    const d2 = b.date ? new Date(b.date).getTime() : b.time

    return d2 - d1
  })

  return (
    <Layout>
      <Text style={styles.title}>Histórico</Text>

      <Divider opacity={0} />

      <View>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 1 }]}>Bar</Text>
          <Text style={[styles.th, { width: 100, textAlign: 'center' }]}>Tipo</Text>
          <Text style={[styles.th, { width: 68, textAlign: 'right' }]}>Qntd.</Text>
          <Text style={[styles.th, { width: 65, textAlign: 'center' }]}>Sinc.</Text>
        </View>

        {movements.map((movement, idx) => (
          <View
            key={`movement-${movement?.id || movement.time}-${idx}`}
            style={[
              styles.tr,
              { backgroundColor: (idx % 2 ? '#dbeafe99' : '#fff') },
              (idx + 1 === movements.length ? styles.lastTr : {})
            ]}
          >
            <View style={[styles.td, { flex: 1, flexDirection: 'column' }]}>
              <Text style={styles.text}>{movement.name_operator || '-'}</Text>
              <Text style={[styles.text, { fontSize: 10 }]}>{movement.date ? formatDBDateTime(movement.date) : formatTimeToDateTime(movement.time)}</Text>
              <Text style={[styles.text, { fontSize: 10 }]}>{movement.status}</Text>
            </View>
            <View style={[styles.td, { width: 100 }]}>
              <Text style={[styles.typeTag, movement.type === 'in' ? styles.typeTagIn : styles.typeTagOut]}>{movement.type === 'in' ? 'Entrega' : 'Devol.'}</Text>
            </View>
            <View style={[styles.td, { width: 68, justifyContent: 'flex-end' }]}>
              <Text style={styles.text}>{movement.quantity}</Text>
            </View>
            <View style={[styles.td, { width: 65, alignItems: 'center', justifyContent: 'center' }]}>
              {movement.sync ? (
                <MaterialIcons name="check-circle" size={20} color="#16a34a" />
              ) : (
                <FontAwesome5 name="exclamation-circle" size={20} color="orange" />
              )}
            </View>
          </View>
        ))}
      </View>
    </Layout>
  )
}

export { MovementHistory }