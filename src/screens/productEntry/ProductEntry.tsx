import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { Layout } from "../../template"
import { Button, Divider, Input } from "../../components"
import { useProductEntry } from "./hooks/useProductEntry"
import { ArtOption } from "./components/ArtOption"

import type { RootStackNavigation } from "src/routes/stack.routes"

import { AntDesign } from '@expo/vector-icons/'

const ProductEntry = ({ navigation, route }: RootStackNavigation<'ProductEntry'>) => {

  const {
    arts,
    artValue,
    setArtValue,
    onQuantityChange,
    quantityValue,
    responsibleValue,
    setResponsibleValue,
    saveMovement,
    pickImage,
    imageValue
  } = useProductEntry(route.params)

  return (
    <Layout>
      <Text style={styles.title}>Entrega de copos</Text>
      <Text style={styles.subtitle}>Bar 1</Text>

      <Divider space={20} />

      <View style={styles.optionsContainer}>
        {arts.map(art => (
          <ArtOption
            key={`art-${art.id}`}
            id={art.id}
            currentValue={artValue}
            image={art.imagem}
            onTouch={setArtValue}
          />
        ))}     
      </View>

      <Divider opacity={0} space={10} />

      <Input
        placeholder="Quantidade"
        keyboardType="number-pad"
        value={quantityValue}
        onChangeText={onQuantityChange}
      />

      <Divider opacity={0} />

      <Input
        placeholder="Responsável"
        value={responsibleValue}
        onChangeText={setResponsibleValue}
      />

      <Divider opacity={0} />

      <TouchableOpacity style={styles.imageContainer} activeOpacity={.75} onPress={pickImage}>
        {imageValue ? (
          <Image source={{ uri: imageValue }} style={styles.image} />
        ) : (
          <>
            <Text style={styles.imageText}>Adicionar foto</Text>
            <AntDesign name="picture" size={120} color={'#0009'} />
          </>
        )}
      </TouchableOpacity>

      <Divider opacity={0} />

      <Button label="Salvar" color="green" />
    </Layout>
  )
}

const styles = StyleSheet.create({
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
    borderColor: '#0009',
    borderWidth: 3
  },
  imageText: {
    fontWeight: '600',
    color: '#0009',
    fontSize: 18
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%'
  }
})

export { ProductEntry }