import { StyleSheet, View, Text, FlatList, TouchableOpacity  } from "react-native"
import { Layout } from "src/template"
import { Divider, Input } from "src/components"
import { Operator } from "./components/Operator"
import { formatDBDate } from "src/utils/date.utils"
import { useHome } from './hooks/useHome'
import { PrintQrCode } from "src/components"

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStockStore } from "src/stores/stockStore"
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
    useEvent,
    searchValue,
    setSearchValue
  } = useHome({ navigation, route })

  const stock = useStockStore(state => state.stock)

  const handlePress = () => {
    navigation.navigate('PrintQrCode');
  };

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

      <Divider opacity={0} />

      <PrintQrCode/>

      <Divider opacity={0} />
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
});

export { Home }