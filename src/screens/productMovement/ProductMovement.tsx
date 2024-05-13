import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { Button, Divider, Input } from "src/components"
import { useProductMovement } from "./hooks/useProductMovement"
import { AntDesign } from '@expo/vector-icons/'
import { ArtOption } from "./components/ArtOption"
// import Signature  from "./components/SignatureComponent"
import { useAwesomeAlert } from "src/hooks"
import { Layout } from "src/template"
import { styles } from "./styles"

import type { HomeStackRouteScreen } from "src/routes/routes.types"

const ProductMovement = ({ navigation, route }: HomeStackRouteScreen<'ProductMovement'>) => {

  const { AwesomeAlertComponent, showAlert } = useAwesomeAlert()

  const {
    arts,
    onQuantityChange,
    catchPicture,
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
          <View key={`art-${art.id}`}>
            <ArtOption
              id={art.id}
              currentValue={values.art}
              image={art.imagem}
              name={art.nome}
            />

            <View style={{'flexDirection': 'row', 'justifyContent' : 'space-between'}}>
              <TextInput
                placeholder="Limpos"
                style={[styles.quantidade, route.params.movementType === 'in' ? { width: 173 } : { width: 80 }]}
                keyboardType="number-pad"
                value={values.limposQuantityByArt[art.id]?.toString()}
                onChangeText={text => {
                  const limpos = text.trim() === '' ? undefined : parseInt(text);
                  setFieldValue(`limposQuantityByArt.${art.id}`, limpos);
                }}
              />

              { route.params.movementType === 'out' &&
                <TextInput
                  placeholder="Sujos"
                  style={[styles.quantidade, { width: 80 }]}
                  keyboardType="number-pad"
                  value={values.sujosQuantityByArt[art.id]?.toString()}
                  onChangeText={text => {
                    const sujos = text.trim() === '' ? undefined : parseInt(text);
                    setFieldValue(`sujosQuantityByArt.${art.id}`, sujos);
                  }}
                />
              }
            </View>

          </View>
        ))}
      </View>

      <Divider opacity={0} space={10} />

      <Input
        placeholder="Responsável"
        value={values.responsible}
        onChangeText={handleChange('responsible')}
      />

      <Divider opacity={0} />

      <TouchableOpacity style={styles.imageContainer} activeOpacity={.75} onPress={catchPicture}>
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
            disabled={
              (!Object.values(values.sujosQuantityByArt).some(value => value !== undefined && value > 0) && !Object.values(values.limposQuantityByArt).some(value => value !== undefined && value > 0)) ||
              !values.responsible ||
              !values.image
            }
          />
        </View>
      </View>

      <AwesomeAlertComponent />
    </Layout>
  )
}

export { ProductMovement }