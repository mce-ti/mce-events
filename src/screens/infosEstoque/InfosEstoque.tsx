import { View, Text, StyleSheet, Alert } from "react-native"
import { Layout } from "src/template"

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { Divider } from "src/components"
import { useStockStore } from "src/stores/stockStore"

const InfosEstoque = ({ navigation, route }: HomeStackRouteScreen<'InfosEstoque'>) => {
  const stockInfos = useStockStore(state => state.stockInfos);

  const estoqueLimpo = stockInfos.estoque_limpo[route.params.id_estoque];
  const estoqueInicial = stockInfos.estoque_inicial[route.params.id_estoque];

  if(!estoqueLimpo || !estoqueLimpo) {
    Alert.alert(
      'Ocorreu um erro',
      'Não conseguimos encontrar os registros do estoque. Reinicie o aplicativo e tente novamente!',
      [
        {
          text: 'ENTENDIDO',
          onPress: () =>  navigation.navigate('Home'),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <Text style={styles.eventName}>{route.params.nome_evento} - {route.params.data}</Text>
      <Text style={styles.stockName}>{route.params.nome_estoque}</Text>

      <Divider space={20} />

      <Text style={styles.subStockName}>Estoque limpo disponível</Text>

      {estoqueLimpo.map(item =>(
        <View key={`stock-item-${item.id_arte}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.eventLocal}>{item.nome}</Text>
            <Text style={styles.eventDate}>{item.quantidade}</Text>
          </View>

          <Divider opacity={.1} space={2.5} />
        </View>
      ))}

      <Divider space={10} opacity={0} />

      <Text style={styles.subStockName}>Estoque inicial</Text>

      {estoqueInicial.map((item, index) =>(
        <View key={`stock-item-${index}`}>
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
    fontSize: 22,
    fontWeight: "600",
    color: '#172554',
    textAlign: 'center'
  },
  stockName: {
    fontSize: 18,
    fontWeight: "500",
    color: '#000',
    textAlign: 'center'
  },
  subStockName: {
    fontSize: 18,
    fontWeight: "400",
    color: '#000',
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
});


export { InfosEstoque }