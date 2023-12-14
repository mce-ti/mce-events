import { Text, StyleSheet, View } from "react-native"
import { Divider } from "src/components"
import { Layout } from "src/template"

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import type { RootDrawerScreen } from "src/routes/routes.types"
import { formatDBDateTime, formatTimeToDateTime } from "src/utils/date.utils"
import { useMovementStore } from "src/stores"

const MovementHistory = ({ navigation }: RootDrawerScreen<'MovementHistory'>) => {
  const movements = useMovementStore(state => state.movements)

  return (
    <Layout>
      <Text style={styles.title}>Histórico</Text>

      <Divider opacity={0} />

      <View style={styles.table}>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 1 }]}>Bar</Text>
          <Text style={[styles.th, { width: 90, textAlign: 'center' }]}>Tipo</Text>
          <Text style={[styles.th, { width: 70, textAlign: 'right' }]}>Qntd.</Text>
          <Text style={[styles.th, { width: 70, textAlign: 'center' }]}>Sinc.</Text>
        </View>

        {movements.map((movement, idx) => (
          <View
            key={`movement-${movement?.id || movement.time}-${idx}`}
            style={[
              styles.tr,
              { backgroundColor: (idx % 2 ? '#dbeafe99': '#fff') },
              (idx+1 === movements.length ? styles.lastTr : {})
            ]}
          >
            <View style={[styles.td, { flex: 1, flexDirection: 'column' }]}>
              <Text style={styles.text}>{movement.name_operator || '-'}</Text>
              <Text style={[styles.text, { fontSize: 10 }]}>{movement.date ? formatDBDateTime(movement.date) : formatTimeToDateTime(movement.time)}</Text>
            </View>
            <View style={[styles.td, { width: 90 }]}>
              <Text style={[styles.typeTag, movement.type === 'in' ? styles.typeTagIn : styles.typeTagOut]}>{movement.type === 'in' ? 'Entrada' : 'Saída'}</Text>
            </View>
            <View style={[styles.td, { width: 70, justifyContent: 'flex-end'}]}>
              <Text style={styles.text}>{movement.quantity}</Text>
            </View>
            <View style={[styles.td, { width: 70, alignItems: 'center', justifyContent: 'center' }]}>
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
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    fontWeight: '600'
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lastTr: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  td: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
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
    borderRadius: 2,
    width: '100%',
    textAlign: 'center'
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