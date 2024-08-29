import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Button } from 'react-native';
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

interface Props {
  text: string;
  onOK: (signature: string) => void;
  setScrollEnabled?: (enabled: boolean) => void; // Novo prop
}

const SignatureComponent: React.FC<Props> = ({ text, onOK, setScrollEnabled }) => {
  const [signature, setSignature] = useState<string | null>(null);

  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: string) => {
    Alert.alert("Assinatura Capturada", "Sua assinatura foi salva.");
    onOK(signature);
    setSignature(signature)
  };

  const handleClear = () => {
    if(ref.current) ref.current.clearSignature();
  };

  const handleBegin = () => {
    if (setScrollEnabled) {
      setScrollEnabled(false); // Desativa o scroll ao começar a desenhar
    }
  };

  const handleEnd = () => {
    if (setScrollEnabled) {
      setScrollEnabled(true); // Reativa o scroll ao terminar de desenhar
      ref.current?.readSignature();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Assine no espaço abaixo:</Text>
          <Button title="Limpar" color="#dc2626" onPress={handleClear} />
        </View>

        <SignatureScreen
          ref={ref}
          onBegin={handleBegin}
          onEnd={handleEnd}
          onOK={handleSignature}
          descriptionText={text}
        />

        {/* {signature && (
          <View>
            <Text>Imagem</Text>
            <Image
              source={{ uri: signature }}
              style={styles.signatureImage}
            />
          </View>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    height: 250,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    marginBottom: 30
  },
  signatureImage: {
    marginTop: 20,
    width: 300,
    height: 250,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default SignatureComponent;
