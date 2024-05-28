import { Text, View } from "react-native"
import { Divider } from "src/components"
import { Layout } from "src/template"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useQrCodeStore } from "src/stores"
import { styles } from "./styles"

import type { RootDrawerScreen } from "src/routes/routes.types"
import { useEffect, useState } from "react"
import { UserStorage } from "src/storage/storage.types"
import { useAsyncStorage } from "src/hooks"

const QrCodesHistory = ({ navigation }: RootDrawerScreen<'QrCodesHistory'>) => {

  const { getItem } = useAsyncStorage()

  useEffect(() => {

    const logUser = async () => {
      const storedUser: UserStorage | null = await getItem('user');

      if (storedUser?.id_impressora) {
        setIdImpressora(storedUser.id_impressora)
      }
    };

    logUser();
  }, []);

  const [idImpressora, setIdImpressora] = useState<number | undefined>(undefined);
  
  const qrCodes = useQrCodeStore(state => state.qrCodes).filter(({ id_impressora }) => id_impressora == idImpressora)

  return (
    <Layout>
      <Text style={styles.title}>Histórico - QR Codes ({qrCodes.length})</Text>

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
              <Text style={[styles.textCodigo, , item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.codigo}</Text>
              <Text style={[styles.text, { fontSize: 10 }, item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.data}</Text>
            </View>
            <View style={[styles.td, { width: 70, justifyContent: 'flex-end' }]}>
              <Text style={[styles.text, item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.quantidade}</Text>
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