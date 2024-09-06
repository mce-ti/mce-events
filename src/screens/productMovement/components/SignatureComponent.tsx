import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

interface Props {
  onOK: (signature: string) => void;
  onClear: () => void;
  // setScrollEnabled?: (enabled: boolean) => void; // Novo prop
}

const SignatureComponent: React.FC<Props> = ({ onOK, onClear }) => {
  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: string) => {
    onOK(signature);
    // Alert.alert("Assinatura Capturada", "Sua assinatura foi salva.");
  };

  const handleClear = () => {
    if (ref.current) ref.current.clearSignature();
    if (onClear) onClear();
  };

  // const handleBegin = () => {
  //   if (setScrollEnabled) {
  //     setScrollEnabled(false); // Desativa o scroll ao começar a desenhar
  //   }
  // };

  const handleEnd = () => {
    // if (setScrollEnabled) {
    //   setScrollEnabled(true); // Reativa o scroll ao terminar de desenhar
    // }
    ref.current?.readSignature();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <Text style={styles.title}>Assine abaixo:</Text>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <MaterialIcons name="delete" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
     
        <SignatureScreen
          ref={ref}
          // onBegin={handleBegin}
          onEnd={handleEnd}
          onOK={handleSignature}
          webStyle={`.m-signature-pad { max-width: 100%; width: 100%; height: 300px; }`} 
          penColor="black"
          minWidth={1}
          maxWidth={1}
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
    width: "100%"
  },
  content: {
    flex: 1,
    width: "100%",
    height: 200,
  },
  title: {
    color: "#000",
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left'
  },
  button: {
    width: 40, // Defina a largura aqui
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#dc2626'
  },
  signatureImage: {
    marginTop: 20,
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default SignatureComponent;
