import { useState } from "react"
import { SafeAreaView, TextInput, StyleSheet, View, Text, Image } from "react-native"
import { Layout } from "../../template"
import { Button, Divider, Input, RadioButton } from "../../components"
import { useProductEntry } from "./hooks/useProductEntry"
import { ArtOption } from "./components/ArtOption"

import * as ImagePicker from 'expo-image-picker';

import type { RootStackNavigation } from "src/routes/stack.routes"

const ProductEntry = ({ navigation, route }: RootStackNavigation<'ProductEntry'>) => {

  const {
    arts,
    artValue,
    setArtValue,
    onQuantityChange,
    quantityValue,
    responsibleValue,
    setResponsibleValue,
    saveMovement
  } = useProductEntry(route.params)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (result.assets?.length) {
      // setImage(result?.assets?[0]?.uri);
      console.log(result.assets[0])
    }
  };


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

      <Button label="Adicionar foto" onPress={pickImage} />

      <View style={styles.imageContainer}>

      </View>

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
    height: 200
  }
})

export { ProductEntry }