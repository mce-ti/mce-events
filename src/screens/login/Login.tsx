import { SafeAreaView, TextInput, View, Text } from "react-native"

import { useLogin } from "./hooks/useLogin";
import { Button } from "src/components";
import { styles } from "./styles";

import type { RootStackParamList } from "src/routes/stack.routes";
import type { NavigationProp  } from "@react-navigation/native";

import Logo from '../../../assets/logo.svg'

type LoginScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: LoginScreenProps) => {

  const {
    password,
    setPassword,
    setUsername,
    username,
    singIn,
    isLoading
  } = useLogin({ navigation })

  return (
    <SafeAreaView style={styles.container}>
      <Logo width={400} height={100} style={{ marginBottom: 20 }} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Login:</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} autoCapitalize="none" />
      </View>

      <Button label="Entrar" onPress={singIn} disabled={isLoading} loading={isLoading} />
    </SafeAreaView>
  )
}

export { Login }