import { StyleSheet, View, StatusBar } from "react-native"
import Logo from '../../../assets/logo.svg'

import { SyncButton } from "../syncButton/SyncButton"

const Header = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#172554" />
      
      <View style={styles.content}>
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