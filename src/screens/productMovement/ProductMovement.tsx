import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { Layout } from "src/template"
import { Button, Divider, Input } from "src/components"

import { useProductMovement } from "./hooks/useProductMovement"
import { ArtOption } from "./components/ArtOption"

import type { RootStackNavigation } from "src/routes/stack.routes"

import { AntDesign } from '@expo/vector-icons/'

const ProductMovement = ({ navigation, route: { params } }: RootStackNavigation<'ProductMovement'>) => {

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
    imageValue,
    operatorName
  } = useProductMovement(params)

  return (
    <Layout>
      <Text style={styles.title}>{params.movementType === 'in' ? 'Entrega' : 'Saída'} de copos</Text>
      <Text style={styles.subtitle}>{operatorName}</Text>

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
            <AntDesign name="picture" size={120} color={'#0005'} />
          </>
        )}
      </TouchableOpacity>

      <Divider opacity={0} />

      <View style={styles.actionsContainer}>
        <View style={styles.actionContent}>
          <Button
            label="Cancelar"
            color="gray"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.actionContent}>
          <Button
            label="Salvar"
            color="green"
            onPress={saveMovement}
            disabled={!(imageValue && quantityValue && responsibleValue && artValue)}
          />
        </View>
      </View>
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
    flex:1 
  }
})

export { ProductMovement }