import { StyleSheet, View, Text, FlatList } from "react-native"
import { Layout } from "src/template";
import { Divider, Input } from "src/components";
import { Operator } from "./components/Operator";
import { useHome } from './hooks/useHome';

import type { RootStackNavigation } from "src/routes/stack.routes";
import { formatDBDate } from "src/utils/date.utils";

const Home = ({ navigation, route }: RootStackNavigation<'Home'>) => {

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
        <Text style={styles.eventLocal}>{useEvent?.local}</Text>
        <Text style={styles.eventDate}>{formatDBDate(useEvent?.data)}</Text>
      </View>

      <Divider space={20} />

      <Input
        placeholder="Buscar..."
        value={searchValue}
        onChangeText={setSearchValue}
      />

      <Divider opacity={0} />

      <FlatList
        data={operators.filter(({ nome }) => nome.toLowerCase().includes(searchValue.toLowerCase()))}
        renderItem={({ item }) => (
          <Operator
            name={item.nome}
            color={item.cor}
            entry={() => navigation.navigate('ProductEntry', { id: item.id })}
            output={() => navigation.navigate('ProductEntry', { id: item.id })}
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
    fontWeight: "400",
    marginBottom: 5
  },
  eventDate: {
    color: '#1f2937',
    fontWeight: "400",
    marginBottom: 5
  }
});

export { Home }