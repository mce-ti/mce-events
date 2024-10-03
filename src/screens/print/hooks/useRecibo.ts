import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'

import type { EventStorage } from 'src/storage/storage.types'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import { useArtsStore } from 'src/stores/artsStore'
import { useMovementStore, useStockStore } from 'src/stores'

const useRecibo = ({ navigation, route }: HomeStackRouteScreen<'PrintRecibo'> ) => {
  
  const calculateTotalSubStock = useMovementStore(state => state.calculateTotalSubStock)

  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const [hasSujos, setHasSujos] = useState<boolean>(false)
  const [quantitySujos, setQuantitySujos] = useState<number | undefined>(0)
  const arts = useArtsStore(state => state.arts);
  const stockRel = useStockStore(state => state.stockRel)


  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    const eventStorage: EventStorage|null = await getItem('event')

    // await calculateTotalSubStock();

    setEvent(eventStorage)
  }

  const onScreenFocus = () => {    
    loadInfos()
  }

  useEffect(() => {
    const itemSujos = route.params.produtos.find(item => item.sujos === true);

    if (itemSujos) {
      setHasSujos(true);
      setQuantitySujos(itemSujos?.quantidade);
      console.log('sujos true')
    }
  }, [route.params.produtos]);

  useEffect(onScreenFocus, [])

  return {
    useEvent,
    arts,
    stockRel,
    hasSujos,
    quantitySujos
  }
}

export { useRecibo }