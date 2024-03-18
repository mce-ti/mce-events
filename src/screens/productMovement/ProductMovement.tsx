import { View, Text, Image, TouchableOpacity } from "react-native"
import { Button, Divider, Input } from "src/components"
import { useProductMovement } from "./hooks/useProductMovement"
import { ArtOption } from "./components/ArtOption"
import { AntDesign } from '@expo/vector-icons/'
import { useAwesomeAlert } from "src/hooks"
import { Layout } from "src/template"
import { styles } from "./styles"

import type { HomeStackRouteScreen } from "src/routes/routes.types"

const ProductMovement = ({ navigation, route }: HomeStackRouteScreen<'ProductMovement'>) => {
  
  const { AwesomeAlertComponent, showAlert } = useAwesomeAlert()

  const {
    arts,
    onQuantityChange,
    pickImage,
    formik: {
      values,
      handleChange,
      setFieldValue,
      submitForm,
    }
  } = useProductMovement({ navigation, route, showAlert })

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <Text style={styles.title}>{route.params.movementType === 'in' ? 'Entrega' : 'Devolução'} de copos</Text>
      <Text style={styles.subtitle}>{route.params.name}</Text>

      <Divider space={20} />

      <View style={styles.optionsContainer}>
        {arts.map(art => (
          <ArtOption
            key={`art-${art.id}`}
            id={art.id}
            currentValue={values.art}
            image={art.imagem}
            name={art.nome}
            onTouch={v => setFieldValue('art', v)}
          />
        ))}
      </View>

      <Divider opacity={0} space={10} />

      <Input
        placeholder="Quantidade"
        keyboardType="number-pad"
        value={values.quantity?.toString()}
        onChangeText={onQuantityChange}
      />

      <Divider opacity={0} />

      <Input
        placeholder="Responsável"
        value={values.responsilbe}
        onChangeText={handleChange('responsilbe')}
      />

      <Divider opacity={0} />

      <TouchableOpacity style={styles.imageContainer} activeOpacity={.75} onPress={pickImage}>
        {values.image ? (
          <Image source={{ uri: values.image }} style={styles.image} />
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
            onPress={submitForm}
            disabled={!(values.art && values.quantity && values.responsilbe)}
          />
        </View>
      </View>

      <AwesomeAlertComponent />
    </Layout>
  )
}

export { ProductMovement }