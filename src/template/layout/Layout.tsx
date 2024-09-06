import { ReactNode, useState } from 'react'
import { SafeAreaView, View, ScrollView, StatusBar } from "react-native"
import { SyncButton } from "../syncButton/SyncButton"
import { LogOutButton } from "../logoutButton/LogoutButton"
import { styles } from './styles'

import Logo from '../../../assets/logo.svg'
import React from 'react'

type LayoutProps = {
  children: ReactNode
  onLogoPress?: () => void
}

const Layout = ({ children, onLogoPress }: LayoutProps) => {
  // const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor="#172554" />

        <View style={styles.headerContent}>
          <Logo width={90} style={{ borderColor: 'red', borderWidth: 1 }} onPress={() => onLogoPress?.()} />

          <View style={styles.btnsContainer}>
            <SyncButton />

            <LogOutButton />
          </View>
        </View>
      </View>

      <ScrollView>
        <SafeAreaView style={styles.content}>
          {React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>)
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export { Layout }