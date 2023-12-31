import { StyleSheet, View, Text, Image } from "react-native"

type ArtOptionProps = {
  image: string
  id: number
  name: string
  currentValue: number | null
  onTouch?: (arg0: number) => void
}

const ArtOption = ({ id, image, currentValue, onTouch, name }: ArtOptionProps) => {

  return (
    <View
      style={[
        styles.optionContent,
        { borderColor: currentValue === id ? '#2563eb' : '#e5e7eb', backgroundColor: currentValue === id ? '#f0f9ff' : '#e5e7eb' }
      ]}
      onTouchEnd={() => onTouch?.(id)}
    >
      <Image
        source={{ uri: image }}
        style={[styles.image]}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  optionContent: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    borderWidth: 4,
    borderRadius: 2,
    minWidth: '40%',
    maxWidth: '48%',
    backgroundColor: '#e5e7eb'
  },
  image: {
    resizeMode: 'cover',
    minHeight: 100,
    width: '100%'
  },
  name: {
    fontWeight: '600',
    color: '#172554',
    letterSpacing: .5,
    marginBottom: 10
  }
})

export { ArtOption }