import { View, Text, StyleSheet } from "react-native"
import { Layout } from "src/template"

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { Divider } from "src/components"

const InfosEstoque = ({ navigation, route }: HomeStackRouteScreen<'InfosEstoque'>) => {

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <Text style={styles.eventName}>Evento App - DD/MM/AAAA</Text>
      <Text style={styles.stockName}>{route.params.nome_estoque}</Text>

      <Divider space={5} />

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.eventLocal}>Arte</Text>
          <Text style={styles.eventDate}>quantidade</Text>
        </View>

        <Divider opacity={.1} space={2.5} />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 22,
    fontWeight: "600",
    color: '#172554'
  },
  stockName: {
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