import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import { Layout } from "src/template"
import { Divider, Input } from "src/components"
import { Operator } from "./components/Operator"
import { formatDBDate } from "src/utils/date.utils"
import { useHome } from './hooks/useHome'
import { PrintQrCode } from "src/components"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { useStockStore } from "src/stores/stockStore"
import { useAsyncStorage } from "src/hooks"
import { useEffect, useState } from "react"
import { UserStorage } from "src/storage/storage.types"
import { useQrCodeStore } from "src/stores"

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
    useEvent,
    searchValue,
    setSearchValue
  } = useHome({ navigation, route })

  const stock = useStockStore(state => state.stock)

  const qrCodes = useQrCodeStore(state => state.qrCodes)

  const [id_impressora, setIdImpressora] = useState<number | undefined>(undefined);

  const [deletePermission, setDeletePermission] = useState<boolean>(false);

  const { getItem } = useAsyncStorage()

  const removeLastQrCode = useQrCodeStore(state => state.removeLastQrCode);

  useEffect(() => {
    setDeletePermission(true);
  }, [qrCodes]);

  useEffect(() => {

    const logUser = async () => {
      const storedUser: UserStorage | null = await getItem('user');

      if (storedUser?.id_impressora) {
        setIdImpressora(storedUser.id_impressora)
      }
    };

    logUser();
  }, []);

  const removeQrCode = async (codigo: string, sync?: boolean) => {
    let syncQr = false;

    if (sync) syncQr = true;

    removeLastQrCode(codigo, syncQr);
  }

  return (
    <Layout>
      <View>
        <Text style={styles.eventName}>{useEvent?.nome}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.eventLocal}>{useEvent?.local}</Text>
          <Text style={styles.eventDate}>{formatDBDate(useEvent?.data)}</Text>
        </View>
      </View>

      <Divider space={10} />

      {!id_impressora ?
        <>
          <Input
            placeholder="Buscar..."
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <Divider opacity={0} />
          <FlatList
            data={operators.filter(({ nome, localizacao }) => nome.toLowerCase().includes(searchValue.toLowerCase()) || localizacao?.toLowerCase().includes(searchValue.toLowerCase()))}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Operator
                name={item.nome}
                color={item.cor}
                localizacao={item?.localizacao}
                entry={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, movementType: 'in' })}
                output={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, movementType: 'out' })}
              />
            )}
          />

          <Divider opacity={0} />

          <Text style={styles.eventName}>Estoque</Text>
          {stock.map(item => (
            <View key={`stock-item-${item.id}`}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.eventLocal}>{item.nome}</Text>
                <Text style={styles.eventDate}>{item.quantidade}</Text>
              </View>

              <Divider opacity={.1} space={2.5} />
            </View>
          ))}
        </>
        :
        <>
          <Divider opacity={0} />

          <PrintQrCode />

          <Divider opacity={0} />

          <Text style={styles.eventName}>Ultimos registros</Text>
          {qrCodes.slice(0, 10).map((item, index) => (
            <View key={`stock-item-${item.codigo}`} style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={[styles.voucherCode, item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.codigo}</Text>
                  <Text style={[styles.eventDate, { fontSize: 10 }, item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.data}</Text>
                </View>

                <Text style={[styles.eventDate, item.situacao === 'cancelado' ? { textDecorationLine: 'line-through' } : null]}>{item.quantidade}</Text>

                <Text style={styles.eventDate}>{item.sync}</Text>

                <View>
                  {item.sync ? (
                    <MaterialIcons name="check-circle" size={20} color="#16a34a" />
                  ) : (
                    <FontAwesome5 name="exclamation-circle" size={20} color="orange" />
                  )}

                  {index == 0 && deletePermission && item.situacao != 'cancelado' &&
                    <TouchableOpacity
                      onPress={() => {
                        removeQrCode(item.codigo, item.sync)
                      }}
                      activeOpacity={0.7}
                      style={{ marginTop: 10 }}
                    >
                      <MaterialIcons name="cancel" size={20} color="red" />
                    </TouchableOpacity>
                  }
                </View>

              </View>
              <Divider opacity={.1} space={2.5} />
            </View>
          ))}
        </>
      }
    </Layout>
  )
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  eventLocal: {
    color: '#4b5563',
    fontWeight: "400"
  },
  eventDate: {
    color: '#1f2937',
    fontWeight: "400"
  },
  mgLft10: {
    marginLeft: 50,
  },
  voucherCode: {
    maxWidth: 200,
    overflow: 'hidden',
    marginBottom: 5,
    color: '#4b5563'
  }
});

export { Home }