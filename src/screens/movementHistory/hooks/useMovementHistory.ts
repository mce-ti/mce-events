import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import type { RootDrawerScreen } from "src/routes/routes.types"
import { useMovementStore } from 'src/stores';
import { useArtsStore } from "src/stores/artsStore"
import { formatTextLenght } from 'src/utils/text.utils';
import { EventStorage } from 'src/storage/storage.types';
import { useAsyncStorage } from 'src/hooks'

const useMovementHistory = ({ navigation }: RootDrawerScreen<'MovementHistory'> ) => {
  const movementsInStore = useMovementStore(state => state.movements)
  const arts = useArtsStore(state => state.arts)

  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const [visibleMovements, setVisibleMovements] = useState(30);
  const [hideAddMoreMovements, setHideAddMoreMovements] = useState(false);
  const [countTotalMovements, setCountTotalMovements] = useState(movementsInStore.length); 

  const { getItem } = useAsyncStorage()

  const movements = movementsInStore
    .filter(movement => movement.id_evento === useEvent?.id)
    .sort((a, b) => {
      const d1 = a.date ? new Date(a.date).getTime() : a.time;
      const d2 = b.date ? new Date(b.date).getTime() : b.time;
      return d2 - d1;
    })
    .slice(0, visibleMovements);

  const handleVisibleMovements = () => {
    setVisibleMovements(prevVisible => prevVisible + 30);
  }

  const getNomeProduto = (id_art : number) => {
    const art = arts.find(item => item.id === id_art);
    const nome = art ? art.nome + ' ' + art.medida : '';
    if(art) return formatTextLenght(nome, 35);
    return '';
  }

  const loadInfos = async () => {
    const eventStorage: EventStorage|null = await getItem('event')

    setEvent(eventStorage)
  }

  useEffect(() => {
    if(visibleMovements >= countTotalMovements) {
      setHideAddMoreMovements(true);
    } else {
      setHideAddMoreMovements(false);
    }

    setCountTotalMovements(movementsInStore.length);
  }, [visibleMovements, movements]);

  useEffect(() => {
    loadInfos()
  }, [])

  useFocusEffect(
    useCallback(() => {
      setVisibleMovements(30)
      if(countTotalMovements > 30) setHideAddMoreMovements(false);
    }, [])
  );

  return {
    movements,
    hideAddMoreMovements,
    countTotalMovements,
    handleVisibleMovements,
    getNomeProduto,
  }
}

export { useMovementHistory }
