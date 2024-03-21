import { Text, View } from "react-native"
import { Divider } from "src/components"
import { Layout } from "src/template"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useQrCodeStore } from "src/stores"
import { styles } from "./styles"

import type { RootDrawerScreen } from "src/routes/routes.types"

const QrCodesHistory = ({ navigation }: RootDrawerScreen<'QrCodesHistory'>) => {
  const qrCodes = useQrCodeStore(state => state.qrCodes)

  return (
    <Layout>
      <Text style={styles.title}>Histórico - QR Codes</Text>

      <Divider opacity={0} />

      <View>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 1 }]}>Codigo</Text>
          <Text style={[styles.th, { width: 70, textAlign: 'right' }]}>Qntd.</Text>
          <Text style={[styles.th, { width: 70, textAlign: 'center' }]}>Sinc.</Text>
        </View>

        {qrCodes.map((item, idx) => (
          <View
            key={`${item.codigo}`}
            style={[
              styles.tr,
              { backgroundColor: (idx % 2 ? '#dbeafe99' : '#fff') },
              (idx + 1 === qrCodes.length ? styles.lastTr : {})
            ]}
          >
            <View style={[styles.td, { flex: 1, flexDirection: 'column' }]}>
              <Text style={styles.textCodigo}>{item.codigo}</Text>
              <Text style={[styles.text, { fontSize: 10 }]}>{item.data}</Text>
            </View>
            <View style={[styles.td, { width: 70, justifyContent: 'flex-end' }]}>
              <Text style={styles.text}>{item.quantidade}</Text>
            </View>
            <View style={[styles.td, { width: 70, alignItems: 'center', justifyContent: 'center' }]}>
              {item.sync ? (
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

export { QrCodesHistory }