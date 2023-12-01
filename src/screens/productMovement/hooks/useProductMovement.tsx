import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useAsyncStorage } from 'src/hooks'
import { addProductsMovement } from 'src/storage/storage'

import * as ImagePicker from 'expo-image-picker'

import type { OperatorStorage, ArtStorage } from 'src/storage/storage.types'

type UseProductMovementProps = {
  id: number
  movementType: 'in' | 'out'
}

const useProductMovement = ({ id, movementType }: UseProductMovementProps) => {
  const [quantityValue, setQauntityValue] = useState<string>('')
  const [responsibleValue, setResponsibleValue] = useState<string>('')
  const [imageValue, setImageValue] = useState<null|string>(null)
  const [artValue, setArtValue] = useState<null|number>(null)
  const [arts, setArts] = useState<ArtStorage[]>([])
  const [operatorName, setOperatorName] = useState('')

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const operatorsStorage: OperatorStorage[] = await getItem('operators') || []
    const operatorStorage: OperatorStorage = operatorsStorage.find(operator => operator.id === id)!
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
    const hasAllValues = (quantityValue && responsibleValue && artValue && imageValue && id)

    if (!hasAllValues) {
      Alert.alert('Preencha os campos corretamente')
      return;
    }

    await addProductsMovement({
      time: new Date().getTime(),
      id_art: artValue,
      id_operator: id,
      image: imageValue,
      quantity: parseInt(quantityValue),
      responsible: responsibleValue,
      type: movementType
    })

    Alert.alert('Registros salvos no dispositivo.')

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