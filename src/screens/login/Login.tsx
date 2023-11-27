import { SafeAreaView, TextInput, StyleSheet, View, Text } from "react-native"
import { NavigationProp  } from "@react-navigation/native";

import Logo from '../../../assets/logo.svg'
import { Button } from "../../components";
import { RootStackParamList } from "../../routes/stack.routes";

type LoginScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: LoginScreenProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <Logo width={400} height={100} style={{ marginBottom: 30 }} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Login:</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>

      <Button label="Entrar" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 30,
    backgroundColor: '#172554',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  inputContainer: {
    width: '100%',
    gap: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: '#0369a190',
    width: '100%',
    color: '#fff'
  },
  label: {
    color: '#fff'
  }
});

export { Login }