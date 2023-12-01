import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native"
import Logo from '../../../assets/logo.svg'

import Ionicons from '@expo/vector-icons/Ionicons'

import { useNavigation } from "@react-navigation/native"
import { useAsyncStorage } from "src/hooks"
import { SyncButton } from "../syncButton/SyncButton"

const Header = () => {

  const navigation = useNavigation()
  const { removeItem } = useAsyncStorage()

  const logout = async () => {
    await removeItem('event')
    await removeItem('user')
    await removeItem('arts')
    await removeItem('operators')
    await removeItem('movements')
    
    navigation.reset({
      index: 0,
      // @ts-ignore
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#172554" />
      
      <View style={styles.content}>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="exit-outline" size={24} color="white" />
        </TouchableOpacity>

        <Logo width={90} style={{ borderColor: 'red', borderWidth: 1 }} />
  
        <SyncButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#172554',
  },
  content: {
    paddingHorizontal: 15,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  refresh: {
    position: 'relative'
  },
  refreshIcon: {
    position: 'absolute',
    right: -7,
    top: -7,
  }
})

export { Header }