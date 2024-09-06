import { Layout } from "src/template"
import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import ViewShot from "react-native-view-shot"
import Spinner from "react-native-loading-spinner-overlay";
import useCaptureAndPrint from "./hooks/useCaptureAndPrint";
import { useEffect, useRef, useState } from "react";
import { useRecibo } from "./hooks/useRecibo";
import { currentDateTime, formatDBDate } from "src/utils/date.utils";
import { formatBRL } from "src/utils/value.utils";
import LogoMceBlack from "../../../assets/mce-black-logo.svg";

const PrintRecibo = ({ navigation, route }: HomeStackRouteScreen<'PrintRecibo'>) => {

  const { params } = route;

  const {
    useEvent,
    arts,
    stockRel
  } = useRecibo({ navigation, route })

  const handlePrintComplete = () => {
    navigation.navigate('Home');
  };

  const viewShotRef = useRef<ViewShot>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { captureAndPrint, loading } = useCaptureAndPrint(handlePrintComplete);
  const stock = stockRel.find(stockRel => stockRel.indice === params.indiceStock)

  useEffect(() => {
    setOverlayVisible(loading);
  }, [loading]);

  const handlePrint = async () => {
    await captureAndPrint(viewShotRef);
  };

  const handleNoPrint = async () => {
    navigation.navigate('Home');
  };

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <ViewShot ref={viewShotRef} style={styles.view}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <LogoMceBlack width={150} height={100} />
        </View>

        <View>
          <Text style={styles.eventName}>{formatDBDate(useEvent?.data)} - {useEvent?.nome}</Text>
          <Text style={styles.stockName}>{stock?.estoque}</Text>
        </View>

        <Text style={styles.title}>{params.movementType == 'out' ? 'Recibo de Devolução:' : 'Recibo de Entrega'}</Text>

        <Text style={styles.responsavel}>PDV: <Text style={styles.bold}>{params.pdv}</Text></Text>
        <Text style={styles.responsavel}>Responsável: <Text style={styles.bold}>{params.reponsavel_pdv}</Text></Text>

        {params.produtos.map((item, index) => {
          const art = arts.find(art => art.id === item.id_arte);

          if (!art) return null;

          if (item.sujos === true) {
            return (
              <View key={index}>
                <Text style={styles.produto}>- Copos sujos: {item.quantidade} und. ({formatBRL(art.valor)} / {formatBRL(art.valor * item.quantidade)})</Text>
              </View>
            );
          } else {
            return (
              <View key={index}>
                <Text style={styles.produto}>- {art.nome}: {item.quantidade} und. ({formatBRL(art.valor)} / {formatBRL(art.valor * item.quantidade)})</Text>
              </View>
            );
          }
        })}

        {/* <Text>{params.operador}</Text> */}
        <Text style={styles.responsavel}>{params.movementType == 'out' ? 'Devolvido por:' : 'Recebido por:'} <Text style={styles.bold}>{params.reponsavel}</Text></Text>

        {params.assinatura ? (
          <View style={styles.template}>
            <Image
              source={{ uri: params.assinatura }} // URL da imagem
              style={styles.image}
            />
          </View>
        ) : (
          // Componente ou conteúdo que você quer renderizar no else
          <Text style={{ display: 'none' }}></Text>
        )}

        <Text style={styles.responsavel}>Data: <Text style={styles.bold}>{currentDateTime()}</Text></Text>
      </ViewShot>

      <View style={{ 'flexDirection': 'row', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={handlePrint} style={styles.print}>
          <Text style={{ color: '#fff' }}>IMPRIMIR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNoPrint} style={styles.noPrint}>
          <Text style={{ color: '#fff' }}>NÃO IMPRIMIR</Text>
        </TouchableOpacity>
      </View>


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
    width: 320,
    padding: 5,
    marginTop: 10
  },
  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#000',
    textAlign: 'center'
  },
  stockName: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  eventLocal: {
    color: '#4b5563',
    fontWeight: "400"
  },
  eventDate: {
    color: '#1f2937',
    fontWeight: "400"
  },
  produto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5
  },
  responsavel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5
  },
  template: {
    position: 'relative',
    maxWidth: '100%',
    height: 155,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  },
  image: {
    width: '100%',
    minHeight: 289,
    marginTop: 5,
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
  print: {
    backgroundColor: '#198754',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3
  },
  noPrint: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3
  },
  bold: {
    fontWeight: 'bold'
  }
});

export { PrintRecibo }