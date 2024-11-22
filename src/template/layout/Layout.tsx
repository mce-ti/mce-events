import { ReactNode, useState } from 'react'
import { SafeAreaView, View, ScrollView, StatusBar, Text } from "react-native"
import { SyncButton } from "../syncButton/SyncButton"
import { LogOutButton } from "../logoutButton/LogoutButton"
import { styles } from './styles'

import Logo from '../../../assets/logo.svg'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

type LayoutProps = {
  children: ReactNode
  onLogoPress?: () => void
}

const Layout = ({ children, onLogoPress }: LayoutProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncingChange = (syncing: boolean) => {
    setIsSyncing(syncing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor="#172554" />

        <View style={styles.headerContent}>
          <Logo width={90} style={{ borderColor: 'red', borderWidth: 1 }} onPress={() => onLogoPress?.()} />

          <Text style={styles.headerTitleApp}>GESTÃO DE ESTOQUE</Text>

          <View style={styles.btnsContainer}>
            <SyncButton onSyncingChange={handleSyncingChange} />

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
      
      <Spinner
        visible={isSyncing}
        textContent={'Carregando...'}
        textStyle={{ color: '#FFF' }}
        overlayColor='#000000b8'
      />
    </View>
  )
}

export { Layout }