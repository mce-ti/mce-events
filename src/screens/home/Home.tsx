import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import { Layout } from "src/template"
import { Divider, Input } from "src/components"
import { Operator } from "./components/Operator"
import { formatDBDate } from "src/utils/date.utils"
import { useHome } from './hooks/useHome'
import { PrintQrCode } from "src/components"
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStockStore } from "src/stores/stockStore"
import { useAsyncStorage } from "src/hooks"
import { useEffect, useState } from "react"
import { UserStorage } from "src/storage/storage.types"
import { useQrCodeStore } from "src/stores"
import { getQrCodesStorage } from "src/storage/storage"

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
    useEvent,
    searchValue,
    setSearchValue
  } = useHome({ navigation, route })

  const stock = useStockStore(state => state.stock)

  const qrCodes = useQrCodeStore(state => state.qrCodes)

  // const qrCodes = qrCodesStore.sort((a, b) => {
  //   const d1 = a.codigo
  //   const d2 = b.codigo

  //   return d2 - d1
  // })

  const [id_impressora, setIdImpressora] = useState<number | undefined>(undefined);

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

  return (
    <Layout onLogoPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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

          <Text style={styles.eventName}>Ultimos QR Codes</Text>
          {qrCodes.slice(0, 15).map(item => (
            <View key={`stock-item-${item.codigo}`} style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.voucherCode}>{item.codigo}</Text>
                  <Text style={styles.eventDate}>{item.data}</Text>
                </View>
     
                <Text style={styles.eventDate}>qtd. {item.quantidade}</Text>

                <Text style={styles.eventDate}>{item.sync}</Text>
                
                {item.sync ? (
                  <MaterialIcons name="check-circle" size={20} color="#16a34a" />
                ) : (
                  <FontAwesome5 name="exclamation-circle" size={20} color="orange" />
                )}
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
    overflow:  'hidden',
    marginBottom: 5,
    color: '#4b5563'
  }
});

export { Home }