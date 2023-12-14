import { ReactNode } from 'react'
import { SafeAreaView, View, ScrollView, StatusBar } from "react-native"
import { SyncButton } from "../syncButton/SyncButton"
import { styles } from './styles'

import Logo from '../../../assets/logo.svg'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <StatusBar backgroundColor="#172554" />

      <View style={styles.headerContent}>
        <Logo width={90} style={{ borderColor: 'red', borderWidth: 1 }} />

        <SyncButton />
      </View>
    </View>

    <ScrollView>
      <SafeAreaView style={styles.content}>
        {children}
      </SafeAreaView>
    </ScrollView>
  </View>
)

export { Layout }