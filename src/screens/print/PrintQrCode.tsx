import { Layout } from "src/template"
import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import ViewShot from 'react-native-view-shot';
import { Divider, MyQRCode } from "src/components";
import { useRef, useState } from "react";
import { useQrCodeStore } from "src/stores";
import { QrCodeStorage } from "src/storage/storage.types";
import { format } from 'date-fns';
import * as Print from 'expo-print';


const PrintQrCode = ({ navigation }: HomeStackRouteScreen<'PrintQrCode'>) => {

  const addQrCodeStore = useQrCodeStore(state => state.addQrCode);
  
  const dateTime = new Date();

  const formattedDateTime = format(dateTime, 'dd/MM/yyyy HH:mm:ss');

  const [timestamp, setTimestamp] = useState(Date.now());

  const viewShotRef = useRef<ViewShot>(null);

  const [capturedImage, setCapturedImage] = useState<string>('');

  const updateTimestamp = () => {
    setTimestamp(Date.now());
  };

  const qrCodeData: QrCodeStorage = {
    codigo: timestamp
  };

  // addQrCodeStore(qrCodeData);

  // const saveImageAsJPG = async (imageUri:string) => {
  //   try {
  //     const jpgUri = imageUri.replace('.png', '.jpg');
  //     await FileSystem.moveAsync({
  //       from: imageUri,
  //       to: jpgUri,
  //     });
  //     console.log('Imagem salva como JPG:', jpgUri);
  //     setCapturedImage(jpgUri)
  //     return jpgUri;
  //   } catch (error) {
  //     console.error('Erro ao salvar a imagem como JPG:', error);
  //     return null;
  //   }
  // };

  const captureAndPrint  = async () => {
    if (!viewShotRef.current) {
      console.warn('ViewShot ref is not defined');
      return;
    }
  
    try {
      if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
        const uri = await viewShotRef.current.capture();
        // const uri = 'https://www.meucopoeco.com.br/assets/site/images/footer/logo-pix.png';
        if (uri) {
          setCapturedImage(uri)
          
          setTimeout(() => {
            Print.printAsync({ uri });
          }, 1000)
    
          console.log('Screenshot captured:', uri);
        }
      } else {
        console.warn('ViewShot ref is not defined or capture() function is missing');
      }
    } catch (error) {
      console.error('Error while capturing screenshot:', error);
    }
  };

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <TouchableOpacity onPress={captureAndPrint}><Text>Shoot</Text></TouchableOpacity>
      <ViewShot ref={viewShotRef} style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <View></View>

          <View style={styles.containerTexts}>
              <Text style={styles.text}>1. Ler o QR Code com seu celular</Text>
              <Text style={styles.text}>2. Entre na página web</Text>
              <Text style={styles.text}>3. Preencha os seus dados Pix</Text>
              <Text style={styles.text}>4. Receba a sua caução de volta em até 2 dias úteis</Text>
          </View>

          <View>
            <MyQRCode code={timestamp.toString()} size={315} />
          </View>

          <View>
              <Text style={styles.data}>{formattedDateTime}</Text>
          </View>
        </View>
      </ViewShot>

      <View style={{ flex: 1 }}>
        {!!capturedImage && (
        <View style={{ flex: 1 }}>
          <Text>Imagem {capturedImage}</Text>
          <Image source={{ uri: capturedImage }} style={{ flex: 1, width: 300, height: 300 }} resizeMode="contain" />
        </View>
      )}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  }, 
  containerTexts: {
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    marginBottom: 5
  },
  data: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20
  },
});

export { PrintQrCode }