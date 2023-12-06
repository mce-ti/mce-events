import { SafeAreaView, TextInput, View, Text } from "react-native"

import { useLogin } from "./hooks/useLogin"
import { Button } from "src/components"
import { styles } from "./styles"
import { useAwesomeAlert } from "src/hooks"

import Logo from '../../../assets/logo.svg'

const Login = () => {

  const { AwesomeAlertComponent, showAlert } = useAwesomeAlert()

  const {
    isLoading,
    formik: {
      values,
      handleChange,
      submitForm
    }
  } = useLogin({ showAlert })

  return (
    <SafeAreaView style={styles.container}>
      <Logo width={400} height={100} style={{ marginBottom: 20 }} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Login:</Text>
        <TextInput
          style={styles.input}
          value={values.username}
          onChangeText={handleChange('username')}
          autoCapitalize="none"
          textContentType="username"
          autoComplete="username"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={values.password}
          onChangeText={handleChange('password')}
          autoCapitalize="none"
          textContentType="password"
          autoComplete="password"
        />
      </View>

      <Button label="Entrar" onPress={submitForm} disabled={isLoading} loading={isLoading} />

      <AwesomeAlertComponent />
    </SafeAreaView>
  )
}

export { Login }