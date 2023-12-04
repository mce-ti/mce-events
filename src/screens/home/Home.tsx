import { StyleSheet, View, Text, FlatList } from "react-native"
import { Layout } from "src/template"
import { Divider, Input } from "src/components"
import { Operator } from "./components/Operator"
import { formatDBDate } from "src/utils/date.utils"
import { useHome } from './hooks/useHome'

import type { HomeStackRouteScreen } from "src/routes/routes.types"

const Home = ({ navigation, route }: HomeStackRouteScreen<'Home'>) => {

  const {
    operators,
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
        placeholder="Buscar..."
        value={searchValue}
        onChangeText={setSearchValue}
      />

      <Divider opacity={0} />
      <FlatList
        data={operators.filter(({ nome }) => nome.toLowerCase().includes(searchValue.toLowerCase()))}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Operator
            name={item.nome}
            color={item.cor}
            localizacao={item?.localizacao}
            entry={() => navigation.navigate('ProductMovement', { id: item.id, movementType: 'in' })}
            output={() => navigation.navigate('ProductMovement', { id: item.id, movementType: 'out' })}
          />
        )}
      />
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
  }
});

export { Home }