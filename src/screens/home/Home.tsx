import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native"
import { Header } from "../../template";
import { Divider, Input } from "../../components";
import { Operator } from "./components/Operator";

import { RootStackParamList } from "../../routes/stack.routes";
import { NavigationProp } from "@react-navigation/native";

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
}

const Home = ({ navigation }: HomeScreenProps) => {

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={styles.content}>
        <View style={styles.infos}>
          <Text style={styles.eventName}>Planeta Atlântida</Text>
          <Text style={styles.eventLocal}>Av. Interbalneários Interbalneários, 413 - XANGRI-LÁ, Xangri-lá - RS</Text>
          <Text style={styles.eventDate}>02/02/2024</Text>
        </View>

        <Divider space={20} />

        <Input placeholder="Buscar..." />

        <Divider opacity={0} />

        <FlatList
          data={[{},{},{},{}]}
          renderItem={({ item }) => <Operator entry={() => navigation.navigate('ProductEntry')} output={() => navigation.navigate('ProductEntry')} />}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 20
  },
  infos: {

  },
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