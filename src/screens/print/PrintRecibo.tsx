import { Layout } from "src/template"
import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import ViewShot from "react-native-view-shot"
import Spinner from "react-native-loading-spinner-overlay";
import useCaptureAndPrint from "./hooks/useCaptureAndPrint";
import { useEffect, useRef, useState } from "react";
import { useRecibo } from "./hooks/useRecibo";
import { formatDBDate } from "src/utils/date.utils";
import { template } from "lodash";

const PrintRecibo = ({ navigation, route }: HomeStackRouteScreen<'PrintRecibo'>) => {

  const { params } = route;

  const {
    useEvent
  } = useRecibo({ navigation, route })

  const viewShotRef = useRef<ViewShot>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { captureAndPrint, loading } = useCaptureAndPrint();

  useEffect(() => {
    setOverlayVisible(loading);
  }, [loading]);

  const handlePress = async () => {
    await captureAndPrint(viewShotRef);
  };
  
  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <ViewShot ref={viewShotRef} style={styles.view}>
        <View>
          <Text style={styles.eventName}>{formatDBDate(useEvent?.data)} - {useEvent?.nome}</Text>
        </View>

        {params.produtos.map((item) => (
          <View key={`stock-item-${item.id}`}>
            <Text>ID: {item.id_arte}</Text>
            <Text>QUANTIDADE: {item.quantidade}</Text>
          </View>
        ))}
        <Text>{params.indiceStock}</Text>
        {/* <Text>{params.operador}</Text> */}
        <Text>{params.movementType == 'out' ? 'Devolvido por:' : 'Entrege por:' } {params.reponsavel}</Text>
          <Image
            source={{ uri: params.assinatura }} // URL da imagem
            style={styles.image}
          />

      </ViewShot>

      <TouchableOpacity onPress={handlePress}>
        <Text>Imprimir</Text>
      </TouchableOpacity>

      <Spinner
        visible={loading}
        textContent={'Carregando...'}
        textStyle={{ color: '#FFF' }}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 'auto',
    width: 300,
    padding: 10
  },
  eventName: {
    fontSize: 22,
    fontWeight: "500",
    color: '#000'
  },
  eventLocal: {
    color: '#4b5563',
    fontWeight: "400"
  },
  eventDate: {
    color: '#1f2937',
    fontWeight: "400"
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1, 
    borderColor: 'black',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Cor semi-transparente
  },
});

export { PrintRecibo }