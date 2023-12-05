import { Text, StyleSheet } from "react-native"
import { Layout } from "src/template"

const MovementHistory = () => {

  return (
    <Layout>
       <Text style={styles.title}>Histórico</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  }
})

export { MovementHistory }