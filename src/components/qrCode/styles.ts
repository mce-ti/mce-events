import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  actBtns: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  print: {
    backgroundColor: '#007bff',
    width: 45,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 20
  },
  newVoucher: {
    backgroundColor: '#28a745',
    width: 45,
    height: 45,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#d1d1d1",
    paddingLeft: 20
  },
  containerTexts: {
    marginBottom: 20,
    width: 330,
    paddingHorizontal: 15
  },
  head: {
    flex: 1,
    display: 'flex',
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 17,
    marginLeft: 10
  },
  textDeafault: {
    fontSize: 20,
    marginBottom: 5,
  },
  ctnData: {
    width: 350,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10
  },
  data: {
    textAlign: 'center',
    fontSize: 20
  },
  email: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30
  },
  codigoQr: {
    transform: [{ rotate: '270deg' }],
    position: 'absolute',
    bottom: '46%',
    left: -235,
    textAlign: 'center',
    fontSize: 14,
    width: 500
  },
  gerarQRcode: {
    color: '#fff',
    backgroundColor: '#475569',
    borderRadius: 5,
    height: 50,
    width: 170
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontWeight: "bold"
  },
  inputQuantidade: {
    textAlign: 'center',
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 3,
    color: 'black',
    marginHorizontal: 10,
    fontSize: 18
  }
})