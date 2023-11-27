import { ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from "react-native"
import { Header } from "../header/Header";

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <View style={styles.container}>
    <Header />
    <SafeAreaView style={styles.content}>
      {children}
    </SafeAreaView>
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 20
  },
});

export { Layout }