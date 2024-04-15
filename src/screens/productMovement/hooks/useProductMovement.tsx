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

      const hasAllValues = (values.quantityByArt && values.responsible && params.id && params.indice_estoque && event)

      // const hasAllValues = (values.art && values.image && values.quantity && values.responsible && params.id && event)

      if (!hasAllValues) {
        showAlert({
          show: true,
          title: 'Atenção',
          message: 'Preencha os campos corretamente.',
        })

        return
      }

      for (const artId in values.quantityByArt) {
        const quantity = values.quantityByArt[artId];
    
        // Verificar se a quantidade é válida (não é undefined ou NaN)
        if (typeof quantity === 'number' && !isNaN(quantity)) {

          await addProductMovement({
            id_evento: event.id,
            indice_estoque: params.indice_estoque,
            time: new Date().getTime(),
            id_art: parseInt(artId),
            id_operator: params.id,
            name_operator: params.name,
            quantity: quantity,
            responsible: values.responsible,
            type: params.movementType
          });
        }
      }

      // await addProductMovement({
      //   id_evento: event.id,
      //   time: new Date().getTime(),
      //   id_art: values.art!,
      //   id_operator: params.id,
      //   name_operator: params.name,
      //   quantity: values.quantity!,
      //   responsible: values.responsible,
      //   type: params.movementType
      // })

      showAlert({
        show: true,
        title: 'Sucesso',
        message: 'Registros salvos no dispositivo.',
        onConfirm: () => {
          navigation.goBack()
        }
      })

      return

      // if (await getPermission('MediaLibrary')) {
      //   const asset = await MediaLibrary.createAssetAsync(values.image)
      //   const album = await MediaLibrary.createAlbumAsync('mceEvents', asset, false)
      //   const albumAssets = await MediaLibrary.getAssetsAsync({ album })

      //   const uriAsset = albumAssets.assets.find(albumAsset => albumAsset.filename === asset.filename)?.uri

      //   if (uriAsset) {
      //     await addProductMovement({
      //       id_evento: event.id,
      //       time: new Date().getTime(),
      //       id_art: values.art!,
      //       id_operator: params.id,
      //       name_operator: params.name,
      //       image: uriAsset,
      //       quantity: values.quantity!,
      //       responsible: values.responsible,
      //       type: params.movementType
      //     })

      //     showAlert({
      //       show: true,
      //       title: 'Sucesso',
      //       message: 'Registros salvos no dispositivo.',
      //       onConfirm: () => {
      //         navigation.goBack()
      //       }
      //     })

      //     return
      //   }
      // }

      // showAlert({
      //   show: true,
      //   title: 'Atenção',
      //   message: 'Falha ao salvar a imagem, verifique as permições do aplicativo.',
      // })
    }
  })

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
  }
}

export { useProductMovement }