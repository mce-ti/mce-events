import { getEventStorage } from 'src/storage/storage'

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import type { AwesomeAlertProps } from 'src/hooks/useAwesomeAlert'

import { useFormik } from 'formik'
import { initialValues } from '../constants'
import { getPermission } from 'src/utils/permissions'
import { useMovementStore } from 'src/stores'
import { useArtsStore } from 'src/stores/artsStore'

type useProductMovementPrps = {
  showAlert: (arg0: AwesomeAlertProps) => void
} & HomeStackRouteScreen<'ProductMovement'>

const useProductMovement = ({ navigation, route: { params }, showAlert }: useProductMovementPrps) => {
  const arts = useArtsStore(state => state.arts)

  const addProductMovement = useMovementStore(state => state.addProductMovement)

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {

      const event = await getEventStorage()

      const hasAllValues = (values.image && values.responsible && params.id && params.indice_estoque && event && (Object.values(values.limposQuantityByArt) || Object.values(values.sujosQuantityByArt)))

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

        const uriAsset = albumAssets.assets.find(albumAsset => albumAsset.filename === asset.filename)?.uri

        if (uriAsset) {
          for (const artId in values.limposQuantityByArt) {
            const quantity = values.limposQuantityByArt[artId];
      
            if (typeof quantity === 'number' && !isNaN(quantity) && quantity > 0) {
    
              await addProductMovement({
                id_evento: event.id,
                indice_estoque: params.indice_estoque,
                time: new Date().getTime(),
                id_art: parseInt(artId),
                id_operator: params.id,
                name_operator: params.name,
                image: uriAsset,
                status: 'Limpo',
                quantity: quantity,
                responsible: values.responsible,
                type: params.movementType
              });
            }
          }

          for (const artId in values.sujosQuantityByArt) {
            const quantity = values.sujosQuantityByArt[artId];
      
            if (typeof quantity === 'number' && !isNaN(quantity) && quantity > 0) {
    
              await addProductMovement({
                id_evento: event.id,
                indice_estoque: params.indice_estoque,
                time: new Date().getTime(),
                id_art: parseInt(artId),
                id_operator: params.id,
                name_operator: params.name,
                image: uriAsset,
                status: 'Sujo',
                quantity: quantity,
                responsible: values.responsible,
                type: params.movementType
              });
            }
          }

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

      return
    }
  })

  const onQuantityChange = (value: string | number = 0) => {
    let newValue = '0'

    if (typeof value === 'string') newValue = value.replace(/\D/g, "")

    formik.setFieldValue('quantity', parseInt(newValue))
  }

  
  const catchPicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })

    result.assets?.length && formik.setFieldValue('image', result.assets[0].uri)
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
    catchPicture,
  }
}

export { useProductMovement }