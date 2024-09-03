import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import { Button, Divider, Input } from "src/components"
import { useProductMovement } from "./hooks/useProductMovement"
import { AntDesign } from '@expo/vector-icons/'
import { ArtOption } from "./components/ArtOption"
// import Signature  from "./components/SignatureComponent"
import { useAwesomeAlert } from "src/hooks"
import { Layout } from "src/template"
import { styles } from "./styles"

import type { HomeStackRouteScreen } from "src/routes/routes.types"
import SignatureComponent from "./components/SignatureComponent"

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

  useEffect(() => {
    setFieldValue('signature', null);
    if(route.params.responsavel) setFieldValue('responsible', route.params.responsavel);
  }, []);

  const handleSignatureOK = (signature: string) => {
    if (signature) setFieldValue('signature', signature);
  };

  const handleClearSignature = () => {
    setFieldValue('signature', null);
    // console.log('null', values.signature ? 'sim' : 'nao')
  };

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <Text style={styles.title}>{route.params.movementType === 'in' ? 'Entrega' : 'Devolução'} de copos</Text>
      <Text style={styles.subtitle}>{route.params.name}</Text>

      <Divider space={20} />

      <View style={styles.optionsContainer}>
        {arts.map(art => (
          <View key={`art-${art.id}`} style={styles.productCard}>
            <ArtOption
              id={art.id}
              currentValue={values.art}
              image={art.imagem}
              name={art.nome + ' - ' + art.medida}
            />

            <View style={{ 'flexDirection': 'row', 'justifyContent': 'space-between', 'width': '100%' }}>
              <TextInput
                placeholder="Limpos"
                style={[styles.quantidade, { width: '100%' }]}
                keyboardType="number-pad"
                value={values.limposQuantityByArt[art.id]?.toString()}
                onChangeText={text => {
                  const limpos = text.trim() === '' ? undefined : parseInt(text);
                  setFieldValue(`limposQuantityByArt.${art.id}`, limpos);
                }}
              />

              {/* { route.params.movementType === 'out' &&
                <TextInput
                  placeholder="Sujos"
                  style={[styles.quantidade, { width: '100%' }]}
                  keyboardType="number-pad"
                  value={values.sujosQuantityByArt[art.id]?.toString()}
                  onChangeText={text => {
                    const sujos = text.trim() === '' ? undefined : parseInt(text);
                    setFieldValue(`sujosQuantityByArt.${art.id}`, sujos);
                  }}
                />
              } */}
            </View>

          </View>
        ))}
      </View>

      <Divider opacity={0} space={10} />

      {route?.params?.movementType === 'out' ? (
        <Input
          placeholder="Sujos"
          value={values.sujos?.toString() || ''}
          keyboardType="numeric"
          maxLength={10} // Opcional
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setFieldValue('sujos', numericText);
          }}
        />
      ) : (
        // Componente ou conteúdo que você quer renderizar no else
        <Text style={{ display: 'none' }}></Text>
      )}

      <Divider opacity={0} space={10} />

      <Text style={styles.label}>{route?.params?.movementType === 'out' ? 'Devolvido por:' : 'Recebido por:'}</Text>

      <Input
        placeholder={route?.params?.movementType === 'out' ? 'Devolvido por' : 'Recebido por'}
        value={values.responsible}
        onChangeText={handleChange('responsible')}
      />

      <Divider opacity={0} />

      {/* <TouchableOpacity style={styles.imageContainer} activeOpacity={.75} onPress={catchPicture}>
        {values.image ? (
          <Image source={{ uri: values.image }} style={styles.image} />
        ) : (
          <>
            <Text style={styles.imageText}>Adicionar foto</Text>
            <AntDesign name="picture" size={120} color={'#0005'} />
          </>
        )}
      </TouchableOpacity> */}

      <SignatureComponent onOK={handleSignatureOK} onClear={handleClearSignature} />

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
              route?.params?.movementType === 'out'
                ? (
                  !Object.values(values.limposQuantityByArt).some(value => value !== undefined) ||
                  !values.responsible ||
                  !values.sujos
                )
                : (
                  !Object.values(values.limposQuantityByArt).some(value => value !== undefined && value > 0) ||
                  !values.responsible
                )
            }
          />
        </View>
      </View>

      <AwesomeAlertComponent />
    </Layout>
  )
}

export { ProductMovement }