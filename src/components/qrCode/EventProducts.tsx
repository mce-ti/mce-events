import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { EventStorage } from "src/storage/storage.types";
import { useAsyncStorage } from "src/hooks";
import { Divider } from "src/components"

import { styles } from './styles'

interface Props {
  onInputChange: (id_arte: number, quantidade: string, valor: number) => void;
  resetQuantity: boolean
}

const EventProducts : React.FC<Props> = ({ onInputChange, resetQuantity }) => {
  const [produtosEvento, setProdutosEvento] = useState<EventStorage["produtos"]>([]);
  const { getItem } = useAsyncStorage();

  useEffect(() => {
    const logUser = async () => {
      try {
        const storedEvent: EventStorage | null = await getItem('event');
        if (storedEvent) setProdutosEvento(storedEvent.produtos);
      } catch (error) {
        console.log('Erro ao carregar os produtos do evento:', error);
      }
    };

    logUser();
  }, [getItem]);

  const handleQuantityChange = (id_arte: number, quantidade: string) => {
    const item = produtosEvento.find(item => item.id_arte === id_arte);
    if (item) {
      const valor = item.valor; 
      onInputChange(id_arte, quantidade, valor);
    }
  };

  useEffect(() => {
    if(resetQuantity === true) {
      setProdutosEvento([]);
      resetQuantity = false;
    }
  }, [resetQuantity]);

  return (
    <View style={{ width: '100%', marginBottom: 20 }}> 
      <Text style={{ fontSize: 20, marginBottom: 40, fontWeight: '700' }}>Produtos disponíveis</Text>
      {produtosEvento.map((item, index) => (
        <View key={`stock-item-${index}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: 18, marginRight: 20 }}>{item.nome}</Text>

            <TextInput
              keyboardType="numeric"
              editable={true}
              style={styles.inputQuantidade}
              onChangeText={(text) => handleQuantityChange(item.id_arte, text)}
            />
          </View>

          <Divider space={10} />
        </View>
      ))}
    </View>
  );
}

export { EventProducts };
