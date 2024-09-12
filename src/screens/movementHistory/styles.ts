import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  subTitle: {
    fontSize: 14,
    marginLeft: 5
  },
  strong: {
    fontWeight: '800'
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
    fontWeight: '600',
    fontSize: 13
  },
  tr: {
    position: 'relative',
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
  typeText: {
    paddingVertical: 2.5,
    fontWeight: '600',
    borderRadius: 2,
    // width: '100%',
    // maxWidth: 60,
    marginBottom: 5
  },
  typeTextIn: {
    color: '#15803d',
    fontSize: 11
  },
  typeTextOut: {
    color: '#dc2626',
    fontSize: 11
  },
  typeTag: {
    position: 'absolute',
    width: 10,
    height: '100%',
    left: 0,
  },
  typeTagIn: {
    backgroundColor: '#dcfce7',
  },
  typeTagOut: {
    backgroundColor: '#fee2e2',
  },
  moreData: {
    borderWidth: 2,
    borderColor: '#1d1d1d',
    width: 35,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
    marginTop: 10
  }
})