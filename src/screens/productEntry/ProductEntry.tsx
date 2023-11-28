import { useState } from "react"
import { SafeAreaView, TextInput, StyleSheet, View, Text, Image } from "react-native"
import { Layout } from "../../template"
import { Button, Divider, Input, RadioButton } from "../../components"
import { useProductEntry } from "./hooks/useProductEntry"
import { ArtOption } from "./components/ArtOption"

import * as ImagePicker from 'expo-image-picker';

const ProductEntry = () => {

  const { artValue, setArtValue } = useProductEntry()

  const [image, setImage] = useState<null|number[]>(null);

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
        <ArtOption
          id={1}
          currentValue={artValue}
          image="https://www.mce.dev.br/assets/eventos/images/arte-1.png"
          onTouch={setArtValue}
        />

        <ArtOption
          id={2}
          currentValue={artValue}
          image="https://www.mce.dev.br/assets/eventos/images/arte-2.png"
          onTouch={setArtValue}
        />        
        <ArtOption
          id={3}
          currentValue={artValue}
          image="https://www.mce.dev.br/assets/eventos/images/arte-2.png"
          onTouch={setArtValue}
        />        
      </View>

      <Divider opacity={0} space={10} />

      <Input placeholder="Quantidade" keyboardType="number-pad" />

      <Divider opacity={0} />

      <Input placeholder="Responsável" />

      <Divider opacity={0} />

      <Button label="Adiconar foto" onPress={pickImage} />
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
  }
})

export { ProductEntry }