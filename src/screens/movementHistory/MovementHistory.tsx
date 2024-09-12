import { Text, View, TouchableOpacity } from "react-native"
import { Button, Divider } from "src/components"
import { Layout } from "src/template"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { formatDBDateTime, formatTimeToDateTime } from "src/utils/date.utils"
import { useMovementHistory } from './hooks/useMovementHistory'
import { styles } from "./styles"

import type { RootDrawerScreen } from "src/routes/routes.types"
import { formatTextLenght } from "src/utils/text.utils"

const MovementHistory = ({ navigation, route }: RootDrawerScreen<'MovementHistory'>) => {
  const  {
    movements,
    hideAddMoreMovements,
    countTotalMovements,
    handleVisibleMovements,
    getNomeProduto,

  } = useMovementHistory({ navigation, route })

  return (
    <Layout>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Histórico</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="remove-red-eye" size={18} color="#1d1d1d" /> 
          <Text style={styles.subTitle}><Text style={styles.strong}>{movements.length}</Text> / {countTotalMovements}</Text>
        </View>
      </View>

      <Divider opacity={0} />

      <View>
        <View style={styles.thead}>
          {/* <Text style={[styles.th, { width: 20, textAlign: 'center' }]}></Text> */}
          <Text style={[styles.th, { flex: 1 }]}>Descrição</Text>
          <Text style={[styles.th, { width: 70, textAlign: 'right' }]}>Qntd.</Text>
          <Text style={[styles.th, { width: 60, textAlign: 'center' }]}>Sinc.</Text>
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
            <Text style={[styles.typeTag, movement.type === 'in' ? styles.typeTagIn : styles.typeTagOut]}></Text>       
            {/* <View style={[styles.td, { width: 20 }]}>
              <Text style={[styles.typeTag, movement.type === 'in' ? styles.typeTagIn : styles.typeTagOut]}>{movement.type === 'in' ? 'Entrega' : 'Devolução'}</Text>
            </View> */}
            <View style={[styles.td, { flex: 1, flexDirection: 'column', position: 'relative' }]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.typeText, movement.type === 'in' ? styles.typeTextIn : styles.typeTextOut]}>{movement.type === 'in' ? 'Entrega' : 'Devolução'}</Text> 
                <Text style={[styles.text, { fontSize: 11, marginBottom: 5 }]}> - {movement.status}</Text>
              </View>
       
              <Text style={[styles.text, { paddingBottom: 5 }]}>{ formatTextLenght(movement.name_operator || '-', 26)}</Text>
              {movement.status === 'Limpo' ? (<Text style={[styles.text, { fontSize: 10 }]}>{getNomeProduto(movement.id_art)}</Text>) : ('')} 
              <Text style={[styles.text, { fontSize: 10 }]}>{movement.date ? formatDBDateTime(movement.date) : formatTimeToDateTime(movement.time)}</Text>
            </View>

            <View style={[styles.td, { width: 70, justifyContent: 'center' }]}>
              <Text style={[styles.text, {fontSize: 12}]}>{movement.quantity}</Text>
            </View>
            <View style={[styles.td, { width: 60, alignItems: 'center', justifyContent: 'center' }]}>
              {movement.sync ? (
                <MaterialIcons name="check-circle" size={17} color="#16a34a" />
              ) : (
                <FontAwesome5 name="exclamation-circle" size={17} color="orange" />
              )}
            </View>
          </View>
        ))}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
              onPress={handleVisibleMovements}
              style={[styles.moreData, {display: hideAddMoreMovements ? 'none' : 'flex' }]}
            >
            <MaterialIcons name="add" size={20} color="#1d1d1d" />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  )
}

export { MovementHistory }