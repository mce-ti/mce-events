import { SafeAreaView, TextInput, StyleSheet, View, TextInputProps } from "react-native"

type InputProps = {
  
} & TextInputProps

const Input = ({ ...props }: InputProps) => (
  <TextInput
    selectionColor={"black"}
    cursorColor={"black"}
    style={styles.input}
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#9ca3af',
    width: '100%',
    color: '#000',
  },
});

export { Input }