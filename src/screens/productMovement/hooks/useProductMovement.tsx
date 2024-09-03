import { getEventStorage } from 'src/storage/storage';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import type { HomeStackRouteScreen } from 'src/routes/routes.types';
import type { AwesomeAlertProps } from 'src/hooks/useAwesomeAlert';

import { useFormik } from 'formik';
import { initialValues } from '../constants';
import { getPermission } from 'src/utils/permissions';
import { useMovementStore, useStockStore } from 'src/stores';
import { useArtsStore } from 'src/stores/artsStore';
import { StockStorage } from 'src/storage/storage.types';
import { useAsyncStorage } from 'src/hooks';
import { Alert } from 'react-native';
import { calcInitialStockQuantity, ItemStock } from '../../../utils/stock.utils';
import { useEffect, useState } from 'react';

type useProductMovementPrps = {
  showAlert: (arg0: AwesomeAlertProps) => void
} & HomeStackRouteScreen<'ProductMovement'>

type Produto = {
  id: number;
  id_arte: number;
  quantidade: number;
};

const useProductMovement = ({ navigation, route: { params }, showAlert }: useProductMovementPrps) => {
  const arts = useArtsStore(state => state.arts)

  const addProductMovement = useMovementStore(state => state.addProductMovement)
  const handleStockQuantity = useStockStore(state => state.handleStockQuantity)
  const stockInfos = useStockStore(state => state.stockInfos);

  // const [produtos, setProdutos] = useState<Produto[]>([]);
  // const [totalItemsToAdd, setTotalItemsToAdd] = useState(0);
  // let counterId = 0;

  // const addProduto = (artId:number, quantity:number) => {
  //   setProdutos(prevProdutos => [
  //     ...prevProdutos, 
  //     { id: counterId, id_arte: artId, quantidade: quantity }
  //   ]);
  //   counterId++;
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {

      const event = await getEventStorage()

      const hasAllValues = (values.responsible && params.id && params.indice_estoque && event && Object.values(values.limposQuantityByArt))

      if (!hasAllValues) {
        showAlert({
          show: true,
          title: 'Atenção',
          message: 'Preencha os campos corretamente.',
        })

        return
      }
      
      let itemsToAdd = 0;
      const estoqueInicial: ItemStock[] = stockInfos.estoque_inicial[params.indice_estoque];
      const sujos = values.sujos !== null ? values.sujos : 0;
      const art = arts[0];

      for (const artId in values.limposQuantityByArt) {
        const quantity = values.limposQuantityByArt[artId];

        if (typeof quantity === 'number' && !isNaN(quantity) && quantity > 0) {
          const { getItem } = useAsyncStorage();
          let stockLimpos: StockStorage | null = await getItem('stockLimpos');
          const stock: StockStorage | null = await getItem('stock');

          if (!stockLimpos || !stock) {
            Alert.alert(
              'Houve um problema!',
              'Ocorreu algum problema ao processar as quantidades do seu estoque. Por favor, veirifique sua conexão com a internet e tente reiniciar o aplicativo!',
              [
                {
                  text: 'Entendi'
                },
              ],
              { cancelable: false }
            );
            return;
          };

          let totalLimpo = stockLimpos.find(item => item.id === parseInt(artId))?.quantidade;

          if (typeof totalLimpo === 'undefined') {
            totalLimpo = 0;
          }

          if (params.movementType == "in" && (totalLimpo || totalLimpo === 0) && (totalLimpo < quantity)) {
            Alert.alert(
              'Houve um problema!',
              'Parece que o seu estoque não tem a quantidade que você quer movimentar.',
              [
                {
                  text: 'Entendi'
                },
              ],
              { cancelable: false }
            );
            return;
          }

          if (params.movementType == "out" && !calcInitialStockQuantity(estoqueInicial, quantity)) {
            Alert.alert(
              'Houve um problema!',
              'Parece que o seu estoque não tem a quantidade que você quer movimentar.',
              [
                {
                  text: 'Entendi'
                },
              ],
              { cancelable: false }
            );
            return;
          }
    
          await addProductMovement({
            id_evento: event.id,
            indice_estoque: params.indice_estoque,
            time: new Date().getTime(),
            id_art: parseInt(artId),
            id_operator: params.id,
            name_operator: params.name,
            // image: uriAsset,
            assinatura: values.signature,
            status: 'Limpo',
            quantity: quantity,
            responsible: values.responsible,
            type: params.movementType
          });
          // itemsToAdd++;
          // addProduto(parseInt(artId), quantity);

          await handleStockQuantity({
            indice_estoque: params.indice_estoque,
            id_arte: parseInt(artId),
            quantidade: quantity,
            tipo: params.movementType
          });
        }
      }

      if (sujos && sujos > 0) {
        await addProductMovement({
          id_evento: event.id,
          indice_estoque: params.indice_estoque,
          time: new Date().getTime(),
          id_art: art.id,
          id_operator: params.id,
          name_operator: params.name,
          // image: uriAsset,
          assinatura: values.signature,
          status: 'Sujo',
          quantity: sujos,
          responsible: values.responsible,
          type: params.movementType
        });

        // itemsToAdd++;
        // addProduto(art.id, sujos);
      }

      // setTotalItemsToAdd(itemsToAdd);

      showAlert({
        show: true,
        title: 'Sucesso',
        message: 'Registros salvos no dispositivo.',
        onConfirm: () => {
          navigation.goBack()
          // navigation.navigate('PrintRecibo', {
          //   produtos: produtos,
          //   movementType: params.movementType,
          //   indiceStock: params.indice_estoque,
          //   operador: 'pendente',
          //   reponsavel: formik.values.responsible,
          //   reponsavel_pdv: 'pendente',
          //   assinatura: formik.values.signature,
          // });
        }
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
