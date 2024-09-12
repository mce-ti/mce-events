import { StyleSheet, View, Text, FlatList } from "react-native"
import { Layout } from "src/template"
import { Divider, Input} from "src/components"
import { Operator } from "./components/Operator"
import { formatDBDate } from "src/utils/date.utils"
import { useHome } from './hooks/useHome'

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import React from "react"

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
    stock,
    stockRel,
    stockLimpoTotal,
    useEvent,
    searchValue,
    setSearchValue
  } = useHome({ navigation, route })

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

      <Input
        placeholder="Buscar bares..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
      
      <FlatList
        data={stockRel}
        scrollEnabled={false}
        renderItem={({ item: stockItem }) => (
          <React.Fragment>
            <Text style={styles.estoque} onPress={() => navigation.navigate('InfosEstoque', { id_estoque: stockItem.indice, nome_estoque: stockItem.estoque, nome_evento: useEvent?.nome, data: formatDBDate(useEvent?.data) })}>{stockItem.estoque}</Text>

            <FlatList
             data={operators.filter(({ nome, localizacao, indice_estoque }) => indice_estoque === stockItem.indice && (nome.toLowerCase().includes(searchValue.toLowerCase()) || localizacao?.toLowerCase().includes(searchValue.toLowerCase())))}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Operator
                  name={item.nome}
                  color={item.cor}
                  localizacao={item?.localizacao}
                  entry={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, responsavel: item.responsavel, movementType: 'in', indice_estoque: stockItem.indice })}
                  output={() => navigation.navigate('ProductMovement', { id: item.id, name: item.nome, responsavel: item.responsavel, movementType: 'out', indice_estoque: stockItem.indice })}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </React.Fragment>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      { stockRel.length === 1 ? (   
          <View>
            <Divider opacity={0} />
            <Text style={styles.stockName}>Estoque total limpo disponível</Text>
            {stockLimpoTotal.map((item, index) => (
              <View key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.eventLocal}>{item.nome}</Text>
                  <Text style={styles.eventDate}>{item.quantidade}</Text>
                </View>

                <Divider opacity={.1} space={2.5} />
              </View>
            ))}
          </View>
        ) : (
          <Text style={{display : 'none'}}></Text>
        )
      }

      <Divider opacity={0} />

      <Text style={styles.stockName}>Estoque total inicial</Text>
      {stock.map((item, index) => (
        <View key={index}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.eventLocal}>{item.nome}</Text>
            <Text style={styles.eventDate}>{item.quantidade}</Text>
          </View>

          <Divider opacity={.1} space={2.5} />
        </View>
      ))}
    </Layout>
  )
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  stockName: {
    fontSize: 18,
    fontWeight: "500",
    color: '#172554',
    marginBottom: 10
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
  },
  cancelButton: {
    height: '100%',
    width: 50,
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 2
  }
});

export { Home }