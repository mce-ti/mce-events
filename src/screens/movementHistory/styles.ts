import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  thead: {
    flexDirection: 'row',
    backgroundColor: '#172554',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  th: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    fontWeight: '600'
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lastTr: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  td: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    color: '#172554'
  },
  typeTag: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    fontWeight: '500',
    borderRadius: 2,
    width: '100%',
    textAlign: 'center'
  },
  typeTagIn: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  typeTagOut: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  }
})