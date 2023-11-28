import { StyleSheet, View, Text, FlatList } from "react-native"
import { Layout } from "src/template";
import { Divider, Input } from "src/components";
import { Operator } from "./components/Operator";
import { useHome } from './hooks/useHome';

import type { RootStackNavigation } from "src/routes/stack.routes";

const Home = ({ navigation }: RootStackNavigation<'Home'>) => {

  const { operators } = useHome({ navigation })

  return (
    <Layout>
      <View>
        <Text style={styles.eventName}>Planeta Atlântida</Text>
        <Text style={styles.eventLocal}>Av. Interbalneários Interbalneários, 413 - XANGRI-LÁ, Xangri-lá - RS</Text>
        <Text style={styles.eventDate}>02/02/2024</Text>
      </View>

      <Divider space={20} />

      <Input placeholder="Buscar..." />

      <Divider opacity={0} />

      <FlatList
        data={operators}
        renderItem={({ item }) => <Operator name={item.nome} color={item.cor} entry={() => navigation.navigate('ProductEntry')} output={() => navigation.navigate('ProductEntry')} />}
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