import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'
import { EventStorage } from 'src/storage/storage.types';

const useEtiqueta = ({ navigation, route }: HomeStackRouteScreen<'PrintEtiqueta'> ) => {

  const quantidadeSujos = route.params.quantidade;
  const { getItem } = useAsyncStorage()
  
  const [useEvent, setEvent] = useState<EventStorage|null>(null)
  const [volumes, setVolumes] = useState<Number>(0);
  const [sobras, setSobras] = useState<Number>(0);

  const loadInfos = async () => {
    const eventStorage: EventStorage|null = await getItem('event')

    setEvent(eventStorage)
  }

  useEffect(() => {
    let calcVolumes = Math.floor(quantidadeSujos / 150);
    let sobras = quantidadeSujos - (calcVolumes * 150)
    let volumes = calcVolumes;
    
    if(sobras) {
      volumes++;
      setSobras(sobras)
    }

    setVolumes(volumes);
    loadInfos();
  })

  return {
    useEvent,
    volumes,
    sobras,
  }
}

export { useEtiqueta }