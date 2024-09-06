import { Dimensions, StyleSheet } from "react-native"

const { width: screenWidth } = Dimensions.get('window');

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
    flexDirection: 'column',
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
  },
  productCard: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  quantidade: {
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 4,
    padding: 3,
    paddingHorizontal: 8,
    marginTop: 5,

  },
  label : {
    fontSize: 13,
    marginBottom: 5
  },
  optionContentSujos: {
    width: "100%",
    height: 188,
    borderColor: '#e5e7eb', 
    backgroundColor: '#e5e7eb',
    padding: 5
  },
  imageSujos: {
    resizeMode: 'cover',
    maxHeight: 150,
    width: '100%',
  },
  nameSujos: {
    fontWeight: '600',
    color: '#172554',
    letterSpacing: .5,
    marginBottom: 10,
    textAlign: 'center'
  },
})