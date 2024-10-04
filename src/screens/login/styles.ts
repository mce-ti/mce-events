import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 30,
    backgroundColor: '#172554',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex: 1,
    gap: 30,
    backgroundColor: '#172554',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
  },
  downloadButton: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#ffffff4f',
    padding: 10,
    borderRadius: 5
  },
  buttonText : {
    color: 'white',
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 5
  }
});