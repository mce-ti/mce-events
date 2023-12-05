import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useAsyncStorage } from 'src/hooks'
import { addProductsMovement } from 'src/storage/storage'

import * as ImagePicker from 'expo-image-picker'

import type { OperatorStorage, ArtStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import type { AwesomeAlertProps } from 'src/hooks/useAwesomeAlert'

type useProductMovementPrps = {
  showAlert: (arg0: AwesomeAlertProps) => void
} & HomeStackRouteScreen<'ProductMovement'>

const useProductMovement = ({ navigation, route: { params }, showAlert }: useProductMovementPrps) => {
  const [quantityValue, setQauntityValue] = useState<string>('')
  const [responsibleValue, setResponsibleValue] = useState<string>('')
  const [imageValue, setImageValue] = useState<null|string>(null)
  const [artValue, setArtValue] = useState<null|number>(null)
  const [arts, setArts] = useState<ArtStorage[]>([])
  const [operatorName, setOperatorName] = useState('')

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const operatorsStorage: OperatorStorage[] = await getItem('operators') || []
    const operatorStorage: OperatorStorage = operatorsStorage.find(operator => operator.id === params.id)!
    const artStorage: ArtStorage[] = await getItem('arts') || []

    setOperatorName(operatorStorage.nome)
    setArts(artStorage)
  }

  useEffect(() => {
    loadInfos()
  }, [])

  const onQuantityChange = (value: string|number = 0) => {
    let newValue = ''

    if (typeof value === 'string') newValue = value.replace(/\D/g, "") || '0'

    newValue = parseInt(newValue).toString()

    setQauntityValue(newValue)
  }

  const saveMovement = async () => {
    const hasAllValues = (quantityValue && responsibleValue && artValue && imageValue && params.id)

    if (!hasAllValues) {
      showAlert({
        show: true,
        title: 'Atenção',
        message: 'Preencha os campos corretamente.',
      })
      return;
    }

    await addProductsMovement({
      time: new Date().getTime(),
      id_art: artValue,
      id_operator: params.id,
      image: imageValue,
      quantity: parseInt(quantityValue),
      responsible: responsibleValue,
      type: params.movementType
    })

    showAlert({
      show: true,
      title: 'Sucesso',
      message: 'Registros salvos no dispositivo.',
      onConfirm: () => {
        navigation.goBack()
      }
    })

    setQauntityValue('')
    setResponsibleValue('')
    setImageValue(null)
    setArtValue(null)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    result.assets?.length &&  setImageValue(result.assets[0].uri)
  };

  return {
    arts,
    artValue,
    setArtValue,
    quantityValue,
    onQuantityChange,
    responsibleValue,
    setResponsibleValue,
    saveMovement,
    pickImage,
    imageValue,
    operatorName
  }
}

export { useProductMovement }