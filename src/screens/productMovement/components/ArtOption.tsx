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
      <Text style={styles.name}>{name}</Text>
      <Image
        source={{ uri: image }}
        style={[styles.image]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  optionContent: {
    alignItems: 'center',
    gap: 5,
    borderWidth: 4,
    borderRadius: 2,
    minWidth: '50%',
    maxWidth: '100%',
    backgroundColor: '#e5e7eb',
  },
  image: {
    resizeMode: 'cover',
    minHeight: 135,
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