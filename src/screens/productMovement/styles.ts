import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: '#172554'
  },
  subtitle: {
    fontSize: 18,
    color: '#172554'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#0005',
    borderWidth: 3
  },
  imageText: {
    fontWeight: '600',
    color: '#0005',
    fontSize: 18
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%'
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 20,
    maxWidth: '100%'
  },
  actionContent: {
    flex: 1
  }
})