import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { EventStorage } from "src/storage/storage.types";
import { useAsyncStorage } from "src/hooks";
import { Divider } from "src/components"
import { debounce } from 'lodash';
import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './styles'

interface Props {
  onInputChange: (id_arte: number, quantidade: string, valor: number) => void;
  resetQuantity: boolean
}

const EventProducts: React.FC<Props> = ({ onInputChange, resetQuantity }) => {
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

  const handleQuantityChange = useCallback((id_arte: number, quantidade: string) => {
    const item = produtosEvento.find(item => item.id_arte === id_arte);
    if (item) {
      const valor = item.valor;
      onInputChange(id_arte, quantidade, valor);
    }
  }, [onInputChange, produtosEvento]);
  
  const debouncedHandleQuantityChange = useCallback(debounce(handleQuantityChange, 300), [handleQuantityChange]);
  

  useEffect(() => {
    if (resetQuantity === true) {
      setProdutosEvento([]);
    }
  }, [resetQuantity]);

  // const changeQuantidade = (type: string) => {
  //   setQuantidade((prevQuantidade : number) => {
  //     if (type === 'add' && prevQuantidade < 5) return prevQuantidade + 1;
  //     if (type === 'remove' && prevQuantidade > 1) return prevQuantidade - 1;
  //     return prevQuantidade;
  //   });
  // };

  return (
    <View>
      {produtosEvento.map((item, index) => (
        <View key={`stock-item-${index}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: 18, marginRight: 20, width: '50%' }}>{item.nome}</Text>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
              {/* <TouchableOpacity onPress={() => changeQuantidade('remove')}><Ionicons name="remove-circle-outline" size={40} color="red" /></TouchableOpacity> */}
              <TextInput
                keyboardType="numeric"
                editable={true}
                style={styles.inputQuantidade}
                onChangeText={(text) => debouncedHandleQuantityChange(item.id_arte, text)}
              />
              {/* <TouchableOpacity onPress={() => changeQuantidade('add')}><Ionicons name="add-circle-outline" size={40} color="green" /></TouchableOpacity> */}
            </View>
          </View>

          <Divider space={10} />
        </View>
      ))}
    </View>
  );
}

export { EventProducts };
