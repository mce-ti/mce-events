import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import ViewShot from 'react-native-view-shot';
import { MyQRCode } from "./QrCode";
import { useEffect, useRef, useState } from "react";
import { useQrCodeStore } from "src/stores";
import { EventStorage, QrCodeStorage, UserStorage } from "src/storage/storage.types";
import { format } from 'date-fns';
import LogoMceBlack from "../../../assets/mce-black-logo.svg";
import Ionicons from '@expo/vector-icons/Ionicons';
import { stringMd5 } from 'react-native-quick-md5';
import { getQrCodesStorage } from "src/storage/storage";
import { useAsyncStorage } from "src/hooks"
import useCaptureAndPrint from './hooks/useCaptureAndPrint';
import { EventProducts } from "./EventProducts";
import { styles } from './styles'
import Spinner from "react-native-loading-spinner-overlay";

const PrintQrCode = () => {

  const viewShotRef = useRef<ViewShot>(null);
  const addQrCodeStore = useQrCodeStore(state => state.addQrCode);
  const dateTime = new Date();
  const formattedDateTime = format(dateTime, 'dd/MM/yyyy HH:mm:ss');
  const [code, setCode] = useState('');
  const [quantidadeVoucher, setQuantidadeVoucher] = useState(1);
  const [quantitiesAndValues, setQuantitiesAndValues] = useState<{ [id_arte: number]: { quantidade: string; valor: number } }>({});
  const [id_impressora, setIdImpressora] = useState<number | undefined>(undefined);
  const [valorVoucherCalc, setValorVoucherCalc] = useState<string | undefined>(undefined);
  const { captureAndPrint, loading } = useCaptureAndPrint();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [resetQuantity, setResetQuantity] = useState(false);
  const { getItem } = useAsyncStorage()

  useEffect(() => {
    const logUser = async () => {
      const storedUser: UserStorage | null = await getItem('user');
      const storedEvent: EventStorage | null = await getItem('event');

      if (storedUser?.id_impressora && storedEvent?.produtos[1].valor) {
        setIdImpressora(storedUser.id_impressora)
      }
    };

    logUser();
  }, []);

  useEffect(() => {
    setOverlayVisible(loading);
  }, [loading]);

  const qrCodeData: QrCodeStorage = {
    codigo: code,
    quantidade: quantidadeVoucher,
    id_impressora: id_impressora,
    situacao: 'ativo'
  }

  const updateValuesQrCode = async () => {
    let valorTotal : number = 0;
    let quantidadeTotal : number = 0;

    Object.keys(quantitiesAndValues).forEach(idArte => {
      const item = quantitiesAndValues[Number(idArte)];
      const id = Number(idArte);
      const quantidade = item.quantidade;
      const valor = item.valor;

      if(parseInt(quantidade) > 0) {
        valorTotal += parseInt(quantidade) * valor;
        quantidadeTotal += parseInt(quantidade);
      }
    });

    if(quantidadeTotal > 0 && valorTotal > 0) {
      const valorFormatado = valorTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
  
      setValorVoucherCalc(valorFormatado);
      setQuantidadeVoucher(quantidadeTotal);
  
      updateCode(quantidadeTotal);

      return true;
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa inserir quantidades válidas no(s) produto(s).',
        [
          {
            text: 'ENTENDIDO',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      return false;
    }
  }

  const updateCode = (quantidadeAtualizada ?: number) => {
    const newTimestamp = Date.now();
    const newCode = uniqid(13) + "-" + stringMd5(newTimestamp.toString());
    setCode(newCode);

    const updatedQrCodeData: QrCodeStorage = {
      codigo: newCode,
      quantidade: quantidadeAtualizada || quantidadeVoucher,
      id_impressora: id_impressora,
      situacao: 'ativo',
      produtos: quantitiesAndValues 
    };

    addQrCodeStore(updatedQrCodeData);
  };

  const removeQrCodes = async () => {
    const { removeItem } = useAsyncStorage()
    removeItem('qrCodes')
  };

  const logQrcodes = async () => {
    const unSyncQrCodes = await getQrCodesStorage() || [];
    console.log(unSyncQrCodes);
  };

  function uniqid(length: number) {
    let hash = '';
    while (hash.length < length) {
      hash += Math.random().toString(36).substring(2);
    }
    return hash.substring(0, length);
  }

  const handleQuantityChange = (id_arte: number, quantidade: string, valor: number) => {
    setQuantitiesAndValues(prevState => {
      const updatedState = { ...prevState };
  
      if (quantidade.trim() !== '0' && quantidade.trim() !== '' && valor !== 0 && !isNaN(valor)) {
        updatedState[id_arte] = { quantidade, valor };
      } else {
        delete updatedState[id_arte];
      }
  
      console.log(updatedState);
      return updatedState;
    });
  };

  const handlePress = async () => {
    const updateSuccess = await updateValuesQrCode();
    
    if (updateSuccess) {
      await captureAndPrint(viewShotRef);
      setResetQuantity(true);
      setQuantitiesAndValues({});
    } else {
      console.log('Erro ao atualizar os valores do código QR.');
    }
  };

  return (
    <View>
      {overlayVisible && (
        <TouchableOpacity style={[styles.overlay, { zIndex: 100 }]} activeOpacity={1} />
      )}
      <View style={{ flex: 1, flexDirection: "column", marginBottom: 20 }}>
        {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
          <TouchableOpacity onPress={() => changeQuantidade('remove')}><Ionicons name="remove-circle-outline" size={50} color="red" /></TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            editable={false}
            style={styles.inputQuantidade}
            value={quantidade.toString()}
            onChangeText={(val) => {
              const parsedValue = parseInt(val, 10);
              if (!isNaN(parsedValue) || val === '') { // Verifica se é um número válido ou se é uma string vazia
                setQuantidade(isNaN(parsedValue) ? 0 : parsedValue); // Se for inválido, define como 0
              }
            }}
          />
          <TouchableOpacity onPress={() => changeQuantidade('add')}><Ionicons name="add-circle-outline" size={50} color="green" /></TouchableOpacity>
        </View> */}

        <EventProducts  onInputChange={handleQuantityChange} resetQuantity={resetQuantity} />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[styles.gerarQRcode, !Object.keys(quantitiesAndValues).length ? {opacity: 0.6}: null]}
            disabled={!Object.keys(quantitiesAndValues).length}
          >
            <Text style={styles.textButton}>GERAR QR CODE  <Ionicons name="qr-code" size={14} color="white" /></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTOES PARA DEBUG */}
       {/*<View style={styles.actBtns}>
        <TouchableOpacity style={styles.print} onPress={useQrCodeStore(state => state.removeAllQrCodes)}><Ionicons name="remove" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={logQrcodes}><Ionicons name="pin" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={() => captureAndPrint(viewShotRef)}><Ionicons name="print" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.newVoucher} onPress={updateCode}><Ionicons name="add-circle-outline" size={30} color="white" /></TouchableOpacity> 
      </View>*/}

      <ViewShot ref={viewShotRef} style={{ backgroundColor: 'white', width: '100%', position: 'absolute', top: 10000 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <LogoMceBlack width={150} height={100} />
            <Text style={styles.title}>{valorVoucherCalc}</Text>
          </View>

          <View style={styles.containerTexts}>
            <Text style={styles.textDeafault}>1. Leia o QR Code com seu celular</Text>
            <Text style={styles.textDeafault}>2. Entre na página web</Text>
            <Text style={styles.textDeafault}>3. Preencha os seus dados Pix</Text>
            <Text style={styles.textDeafault}>4. Receba a sua caução de volta em até 48h</Text>
          </View>

          <View style={{ width: 320, marginBottom: 5 }}>
            <MyQRCode code={qrCodeData.codigo} size={270} />
          </View>
          <Text style={styles.codigoQr}>{qrCodeData.codigo}</Text>

          <View style={styles.ctnData}>
            <View><Text>.</Text></View>
            <View><Text style={styles.data}>{formattedDateTime}</Text></View>
            <View><Text>.</Text></View>
          </View>

          <Text style={styles.email}>Dúvidas? contato@meucopoeco.com.br</Text>
          <Text style={styles.responsabilidade}>Voucher único e de sua responsabilidade</Text>
        </View>
      </ViewShot>

      <Spinner
        visible={loading}
        textContent={'Carregando...'}
        textStyle={{ color: '#FFF' }}
      />
    </View>
  )
}

export { PrintQrCode };