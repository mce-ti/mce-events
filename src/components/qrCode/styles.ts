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
    borderColor: "#d1d1d1"
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
    marginBottom: 50,
  },
  data: {
    textAlign: 'center',
    fontSize: 20
  },
  codigoQr: {
    transform: [{ rotate: '270deg' }],
    position: 'absolute',
    bottom: 173,
    left: -155,
    textAlign: 'center',
    fontSize: 14,
  },
  gerarQRcode: {
    color: '#fff',
    backgroundColor: '#475569',
    borderRadius: 5,
    height: 40,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    padding: 9,
    fontWeight: "600"
  },
})