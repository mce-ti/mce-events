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

import copoSujosImage from '../../../assets/copos-sujos.jpg';

const ProductMovement = ({ navigation, route }: HomeStackRouteScreen<'ProductMovement'>) => {

  const { AwesomeAlertComponent, showAlert } = useAwesomeAlert()

  const {
    arts,
    formik: {
      values,
      handleChange,
      setFieldValue,
      submitForm,
    }
  } = useProductMovement({ navigation, route, showAlert })
  const [step, setStep] = useState(1);

  useEffect(() => {
    setFieldValue('signature', null);
    if (route.params.responsavel) {
      setFieldValue('responsible', route.params.responsavel);
      setFieldValue('responsible_pdv', route.params.responsavel);
      setFieldValue('pdv', route.params.name);
    }
  }, []);

  const handleSignatureOK = (signature: string) => {
    if (signature) setFieldValue('signature', signature);
  };

  const handleClearSignature = () => {
    setFieldValue('signature', null);
    // console.log('null', values.signature ? 'sim' : 'nao')
  };

  const handleSteps = () => {
    if(step === 1) setStep(2);
    else if(step === 2) setStep(1);
  }

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <Text style={styles.title}>{route.params.movementType === 'in' ? 'Entrega' : 'Devolução'} de copos</Text>
      <Text style={styles.subtitle}>{route.params.name}</Text>

      <Divider space={20} />

      {step === 1 ? (
        <View>
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
                </View>

              </View>
            ))}
          </View>

          <Divider opacity={0} space={10} />

          {route?.params?.movementType === 'out' ? (
            <View style={styles.productCard}>
              <View style={styles.optionContentSujos}>
                <Text style={styles.nameSujos}>Sujos: Artes Misturadas</Text>
                <Image
                  source={copoSujosImage}
                  style={styles.imageSujos}
                />
              </View>

              <Input
                placeholder="Sujos"
                style={[styles.quantidade, { width: '100%' }]}
                value={values.sujos?.toString() || ''}
                keyboardType="numeric"
                maxLength={10} // Opcional
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setFieldValue('sujos', numericText);
                }}
              />
            </View>
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

          <View style={styles.actionsContainer}>
            <View style={styles.actionContent}>
              <Button
                label="Voltar"
                color="gray"
                onPress={() => navigation.goBack()}
              />
            </View>

            <View style={styles.actionContent}>
              <Button
                label="Continuar"
                color="green"
                onPress={handleSteps}

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
        </View>
      ) : (
        <View>
          <SignatureComponent onOK={handleSignatureOK} onClear={handleClearSignature} />

          <Divider opacity={0} />

          <View style={styles.actionsContainer}>
            <View style={styles.actionContent}>
              <Button
                label="Voltar"
                color="gray"
                onPress={handleSteps}
              />
            </View>

            <View style={styles.actionContent}>
              <Button
                label="Salvar"
                color="green"
                onPress={submitForm}
              />
            </View>
          </View>
        </View>
      )}

      <AwesomeAlertComponent />
    </Layout>
  )
}

export { ProductMovement }