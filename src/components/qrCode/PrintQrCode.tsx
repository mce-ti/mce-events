import { View, Text, TouchableOpacity, TextInput } from "react-native"
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
import { captureAndPrint } from "./hooks/captureAndPrint";
import { styles } from './styles'

const PrintQrCode = () => {

  function uniqid(length: number) {
    let hash = '';
    while (hash.length < length) {
      hash += Math.random().toString(36).substring(2);
    }
    return hash.substring(0, length);
  }

  const viewShotRef = useRef<ViewShot>(null);

  const addQrCodeStore = useQrCodeStore(state => state.addQrCode);

  const dateTime = new Date();

  const formattedDateTime = format(dateTime, 'dd/MM/yyyy HH:mm:ss');

  const [timestamp, setTimestamp] = useState(Date.now());

  const [code, setCode] = useState(uniqid(13) + "-" + stringMd5(timestamp.toString()));
  const [quantidade, setQuantidade] = useState(1);
  const [id_impressora, setIdImpressora] = useState<number | undefined>(undefined);
  const [valorVoucher, setValorVoucher] = useState<number | undefined>(undefined);
  const [valorVoucherCalc, setValorVoucherCalc] = useState<number | undefined>(undefined);

  const { getItem } = useAsyncStorage()

  useEffect(() => {
    const logUser = async () => {
      const storedUser: UserStorage | null = await getItem('user');
      const storedEvent: EventStorage | null = await getItem('event');

      if (storedUser?.id_impressora && storedEvent?.valorVoucher) {
        setIdImpressora(storedUser.id_impressora)
        setValorVoucher(storedEvent.valorVoucher)
        if(valorVoucher){
          const valorCalculado = valorVoucher * quantidade;
          const valorFormatado = valorCalculado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });
          setValorVoucherCalc(valorFormatado);
        }
      }
    };

    logUser();
  }, []);

  useEffect(() => {
    if (valorVoucher !== undefined && quantidade !== undefined) {
      const valorCalculado = valorVoucher * quantidade;
      const valorFormatado = valorCalculado.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      setValorVoucherCalc(valorFormatado);
    }
  }, [valorVoucher, quantidade]);

  const qrCodeData: QrCodeStorage = {
    codigo: code,
    quantidade: quantidade,
    id_impressora: id_impressora,
    situacao: 'ativo'
  }

  const updateCode = () => {
    const newTimestamp = Date.now();
    const newCode = uniqid(13) + "-" + stringMd5(newTimestamp.toString());
    setCode(newCode);

    const updatedQrCodeData: QrCodeStorage = {
      codigo: newCode,
      quantidade: quantidade,
      id_impressora: id_impressora,
      situacao: 'ativo'
    };

    addQrCodeStore(updatedQrCodeData);
  };

  const removeQrCodes = async () => {
    const { removeItem } = useAsyncStorage()
    removeItem('qrCodes')
  };

  // console.log('use sync', qrCodes)

  const logQrcodes = async () => {
    const unSyncQrCodes = await getQrCodesStorage() || [];
    console.log(unSyncQrCodes);
  };

  const changeQuantidade = (type: string) => {
    setQuantidade((prevQuantidade : number) => {
      if (type === 'add' && prevQuantidade < 5) return prevQuantidade + 1;
      if (type === 'remove' && prevQuantidade > 1) return prevQuantidade - 1;
      return prevQuantidade;
    });
  };

  return (
    <View>
      <View style={{ flex: 1, flexDirection: "column", marginBottom: 20 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
          {/* <Text style={{ fontSize: 20, marginRight: 15, fontWeight: 'bold' }}>QUANTIDADE </Text> */}
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
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              captureAndPrint(viewShotRef);
              updateCode();
            }}
            style={styles.gerarQRcode}
            activeOpacity={0.7}
          >
            <Text style={styles.textButton}>GERAR QR CODE  <Ionicons name="qr-code" size={14} color="white" /> </Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {/* BOTOES PARA DEBUG */}
      {/* <View style={styles.actBtns}>
        <TouchableOpacity style={styles.print} onPress={useQrCodeStore(state => state.removeAllQrCodes)}><Ionicons name="remove" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={logQrcodes}><Ionicons name="pin" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.print} onPress={() => captureAndPrint(viewShotRef)}><Ionicons name="print" size={30} color="white" /></TouchableOpacity>

        <TouchableOpacity style={styles.newVoucher} onPress={updateCode}><Ionicons name="add-circle-outline" size={30} color="white" /></TouchableOpacity>
      </View> */}

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
    </View>
  )
}

export { PrintQrCode };