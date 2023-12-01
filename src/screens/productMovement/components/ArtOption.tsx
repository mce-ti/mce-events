import { StyleSheet, View, Text, Image } from "react-native"

type ArtOptionProps = {
  image: string
  id: number
  currentValue: number | null
  onTouch?: (arg0: number) => void
}

const ArtOption = ({ id, image, currentValue, onTouch }: ArtOptionProps) => {

  return (
    <View
      style={[
        styles.optionContent,
        { borderColor: currentValue === id ? '#2563eb' : 'transparent' }
      ]}
      onTouchEnd={() => onTouch?.(id)}
    >
      <Image
        source={{ uri: image }}
        style={[styles.image]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  optionContent: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderRadius: 2,
    minWidth: '40%',
    maxWidth: '48%'
  },
  image: {
    resizeMode: 'cover',
    minHeight: 100,
    width: '100%'
  }
})

export { ArtOption }