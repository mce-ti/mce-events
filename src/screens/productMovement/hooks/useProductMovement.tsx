import { useEffect, useState } from 'react'
import { useAsyncStorage } from 'src/hooks'
import { getEventStorage } from 'src/storage/storage'

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

import type { OperatorStorage, ArtStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import type { AwesomeAlertProps } from 'src/hooks/useAwesomeAlert'

import { useFormik } from 'formik'
import { initialValues } from '../constants'
import { getPermission } from 'src/utils/permissions'
import { useAuth } from 'src/context/AuthContext'

type useProductMovementPrps = {
  showAlert: (arg0: AwesomeAlertProps) => void
} & HomeStackRouteScreen<'ProductMovement'>

const useProductMovement = ({ navigation, route: { params }, showAlert }: useProductMovementPrps) => {
  const [arts, setArts] = useState<ArtStorage[]>([])
  const [operatorName, setOperatorName] = useState('')

  const { getItem } = useAsyncStorage()
  const { addProductsMovement } = useAuth()

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      const event = await getEventStorage()

      const hasAllValues = (values.art && values.image && values.quantity && values.responsilbe && params.id && event)

      if (!hasAllValues) {
        showAlert({
          show: true,
          title: 'Atenção',
          message: 'Preencha os campos corretamente.',
        })

        return
      }

      if (await getPermission('MediaLibrary')) {
        const asset = await MediaLibrary.createAssetAsync(values.image)

        const album = await MediaLibrary.createAlbumAsync('mceEvents', asset, false)

        const albumAssets = await MediaLibrary.getAssetsAsync({ album })
        const uriAsset = albumAssets.assets.find(file => file.filename === asset.filename)?.uri

        if (uriAsset) {
          await addProductsMovement({
            id_evento: event.id,
            time: new Date().getTime(),
            id_art: values.art!,
            id_operator: params.id,
            name_operator: operatorName,
            image: uriAsset,
            quantity: values.quantity!,
            responsible: values.responsilbe,
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

          return
        }
      }

      showAlert({
        show: true,
        title: 'Atenção',
        message: 'Falha ao salvar a imagem, verifique as permições do aplicativo.',
      })
    }
  })

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

  const onQuantityChange = (value: string | number = 0) => {
    let newValue = '0'

    if (typeof value === 'string') newValue = value.replace(/\D/g, "")

    formik.setFieldValue('quantity', parseInt(newValue))
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })

    result.assets?.length && formik.setFieldValue('image', result.assets[0].uri)
  }

  return {
    formik,
    arts,
    onQuantityChange,
    pickImage,
    operatorName
  }
}

export { useProductMovement }