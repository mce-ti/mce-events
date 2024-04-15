import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native"
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
import React from "react"

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
    stockRel,
    useEvent,
    searchValue,
    setSearchValue
  } = useHome({ navigation, route })

  const [idImpressora, setIdImpressora] = useState<number | undefined>(undefined);

  const stock = useStockStore(state => state.stock)

  const qrCodes = useQrCodeStore(state => state.qrCodes).filter(({ id_impressora }) => id_impressora == idImpressora)

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

    Alert.alert(
      'Cancelar Cupom',
      'Você tem certeza que deseja cancelar este cupom?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Não cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => removeLastQrCode(codigo, syncQr),
        },
      ],
      { cancelable: false }
    );
  };

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

      {!idImpressora ?
        <>
          <Input
            placeholder="Buscar..."
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <FlatList
            data={stockRel.filter(({ estoque }) => estoque.toLowerCase().includes(searchValue.toLowerCase()))}
            scrollEnabled={false}
            renderItem={({ item: stockItem }) => (
              <React.Fragment>
                <Text style={styles.estoque}>{stockItem.estoque}</Text>
                <FlatList
                  data={operators.filter(({ nome, localizacao, indice_estoque }) => indice_estoque === stockItem.indice && (nome.toLowerCase().includes(searchValue.toLowerCase()) || localizacao?.toLowerCase().includes(searchValue.toLowerCase())))}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <Operator
                      name={item.nome}
                      color={item.cor}
                      localizacao={item?.localizacao}
                      entry={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, movementType: 'in', indice_estoque : stockItem.indice })}
                      output={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, movementType: 'out', indice_estoque : stockItem.indice })}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </React.Fragment>
            )}
            keyExtractor={(item, index) => index.toString()}
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
  },
  estoque: {
    backgroundColor: '#007b8b9e',
    color: '#FFFFFF',
    height: 40,
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    paddingVertical: 5
  }
});

export { Home }