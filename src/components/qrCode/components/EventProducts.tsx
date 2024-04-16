import React, { useEffect, useState } from "react";
import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { EventStorage } from "src/storage/storage.types";
import { useAsyncStorage } from "src/hooks";
import { Divider } from "src/components"

import { styles } from '../styles'

interface Props {
  onInputChange: (id_arte: number, quantidade: string, valor: number) => void;
}

const EventProducts : React.FC<Props> = ({ onInputChange }) => {
  const [produtosEvento, setProdutosEvento] = useState<EventStorage["produtos"]>([]);
  const [quantidades, setQuantidades] = useState<{ [key: string]: string }>({});
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

  const handleInputChange = (id_arte: number, quantidade: string, value: number) => {
    setQuantidades({ ...quantidades, [id_arte]: {quantidade: quantidade, value: value} });
    onInputChange(id_arte, quantidade, value);
  };

  return (
    <View style={{ width: '100%', marginBottom: 20 }}>
      {produtosEvento.map((item, index) => (
        <View key={`stock-item-${index}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: 20, marginRight: 20 }}>{item.nome}</Text>

            <TextInput
              keyboardType="numeric"
              editable={true}
              style={styles.inputQuantidade}
              value={quantidades[item.id_arte]}
              onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
                handleInputChange(item.id_arte, event.nativeEvent.text, item.valor)
              }
            />
          </View>

          <Divider space={10} />
        </View>
      ))}
    </View>
  );
}

export { EventProducts };