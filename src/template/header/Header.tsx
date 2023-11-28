import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native"
import Logo from '../../../assets/logo.svg'

import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useAsyncStorage } from "src/hooks";

const Header = () => {

  const navigation = useNavigation()
  const { removeItem } = useAsyncStorage()

  const logout = async () => {
    await removeItem('event')
    await removeItem('user')
    await removeItem('arts')
    await removeItem('operators')
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#172554" />
      <View style={styles.content}>
        <Logo width={90} style={{ borderColor: 'red', borderWidth: 1 }} />
  
        <TouchableOpacity style={styles.exit} onPress={logout}>
          <Ionicons name="exit-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#172554',
  },
  content: {
    paddingHorizontal: 10,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exit: {
    marginRight: 5
  }
})

export { Header }