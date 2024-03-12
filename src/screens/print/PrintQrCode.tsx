import { Layout } from "src/template"
import type { HomeStackRouteScreen } from "src/routes/routes.types"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import ViewShot from 'react-native-view-shot';
import { MyQRCode } from "src/components";
import { useEffect, useRef, useState } from "react";
import { useQrCodeStore } from "src/stores";
import { QrCodeStorage } from "src/storage/storage.types";
import { format } from 'date-fns';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import LogoMceBlack from "../../../assets/mce-black-logo.svg";
import Ionicons from '@expo/vector-icons/Ionicons';
import { stringMd5 } from 'react-native-quick-md5';
import { getQrCodesStorage } from "src/storage/storage";
import { useAsyncStorage } from "src/hooks"

const PrintQrCode = ({ navigation }: HomeStackRouteScreen<'PrintQrCode'>) => {

  function uniqid(length : number) {
    let hash = '';
    while (hash.length < length) {
      hash += Math.random().toString(36).substring(2);
    }
    return hash.substring(0, length);
  }

  const addQrCodeStore = useQrCodeStore(state => state.addQrCode);

  const dateTime = new Date();

  const formattedDateTime = format(dateTime, 'dd/MM/yyyy HH:mm:ss');

  const [timestamp, setTimestamp] = useState(Date.now());

  const [code, setCode] = useState(uniqid(13) + "-" + stringMd5(timestamp.toString()));

  const viewShotRef = useRef<ViewShot>(null);
 
  const qrCodeData: QrCodeStorage = {
    codigo: code
  }

  const removeQrCodes = async () => {
    const { removeItem } = useAsyncStorage()
    removeItem('qrCodes')
  };

  const logQrcodes = async () => {
    const unSyncQrodes = await getQrCodesStorage() || [];
    console.log(unSyncQrodes);
  };

  useEffect(() => {
    addQrCodeStore(qrCodeData);
  }, []);

  const updateCode = () => {
    const newTimestamp = Date.now();
    const newCode = uniqid(13) + "-" + stringMd5(newTimestamp.toString());
    setCode(newCode);
    
    const updatedQrCodeData: QrCodeStorage = {
      codigo: newCode
    };

    addQrCodeStore(updatedQrCodeData);
  };

  const captureAndPrint = async () => {
    if (!viewShotRef.current) {
      console.warn('ViewShot ref is not defined');
      return;
    }

    try {
      if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
        const uri = await viewShotRef.current.capture();
        // const uri = 'https://www.meucopoeco.com.br/assets/site/images/footer/logo-pix.png';
        if (uri) {
          const uriPDF = await convertImageToPDF(uri)

          Print.printAsync({ uri: uriPDF });

          console.log('Screenshot captured:', uriPDF);
        }
      } else {
        console.warn('ViewShot ref is not defined or capture() function is missing');
      }
    } catch (error) {
      console.error('Error while capturing screenshot:', error);
    }
  };

  const convertImageToPDF = async (uriImg: string) => {
    try {
      // Caminho da imagem PNG
      const imageUri = uriImg;
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

      const htmlContent = `
        <html>
          <head>
            <style>
              html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
              }
              img {
                height: 90%;
                padding: 10px;
              }
            </style>
          </head>
          <body>
            <img src="data:image/png;base64,${imageBase64}" />
          </body>
        </html>`
        ;

      // Cria o PDF
      const pdfData = await Print.printToFileAsync({ html: htmlContent });

      return pdfData.uri;
    } catch (error) {
      console.error('Erro ao converter imagem para PDF:', error);
    }
  };

  return (
    <Layout onLogoPress={() => navigation.goBack()}>
      <View style={styles.actBtns}> 
        <TouchableOpacity style={styles.print} onPress={removeQrCodes}><Ionicons name="remove" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={logQrcodes}><Ionicons name="pin" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={captureAndPrint}><Ionicons name="print" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.newVoucher} onPress={updateCode}><Ionicons name="add-circle-outline" size={30} color="white" /></TouchableOpacity>
      </View>
    
      <ViewShot ref={viewShotRef} style={{ backgroundColor: 'white', width: '100%'}}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <LogoMceBlack width={150} height={100} />
            <Text style={styles.title}>RETORNO CAUÇÃO</Text>
          </View>

          <View style={styles.containerTexts}>
            <Text style={styles.text}>1. Ler o QR Code com seu celular</Text>
            <Text style={styles.text}>2. Entre na página web</Text>
            <Text style={styles.text}>3. Preencha os seus dados Pix</Text>
            <Text style={styles.text}>4. Receba a sua caução de volta em até 2 dias úteis</Text>
          </View>

          <View style={{ width: 320 }}>
            <MyQRCode code={qrCodeData.codigo} size={230} />
          </View>

          <View style={styles.ctnData}>
            <View><Text>.</Text></View>
            <View><Text style={styles.data}>{formattedDateTime}</Text></View>
            <View><Text>.</Text></View>
          </View>

          <Text style={styles.codigoQr}>{qrCodeData.codigo}</Text>
        </View>
      </ViewShot>
    </Layout>
  )
}

const styles = StyleSheet.create({
  actBtns: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  print: {
    backgroundColor: '#007bff',
    width: 45,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 20
  },
  newVoucher: {
    backgroundColor: '#28a745',
    width: 45,
    height: 45,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: "#d1d1d1"
  },
  containerTexts: {
    marginBottom: 20,
    width: 330,
    paddingHorizontal: 15
  },
  head: {
    flex: 1,
    display: 'flex',
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 17,
    marginLeft: 10
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  ctnData: {
    width: 350,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 50,
  },
  data: {
    textAlign: 'center',
    fontSize: 20
  },
  codigoQr: {
    transform: [{ rotate: '270deg' }],
    position: 'absolute',
    bottom: 173,
    left: -155,
    textAlign: 'center',
    fontSize: 14,
  }
});

export { PrintQrCode }