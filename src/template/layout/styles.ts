import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#172554',
  },
  headerContent: {
    paddingHorizontal: 15,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    padding: 20,
    paddingTop: 10
  },
  btnsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80
  }
})