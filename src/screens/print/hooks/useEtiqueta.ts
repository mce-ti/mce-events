import { useEffect, useState } from 'react'

import { useAsyncStorage } from 'src/hooks'
import type { HomeStackRouteScreen } from 'src/routes/routes.types'

const useEtiqueta = ({ navigation, route }: HomeStackRouteScreen<'PrintEtiqueta'> ) => {

  const quantidadeSujos = route.params.quantidade;
  const { getItem } = useAsyncStorage()
  const [volumes, setVolumes] = useState<Number>(0);

  useEffect(() => {
    let calcVolumes = Math.floor(quantidadeSujos / 150);
    let sobra = quantidadeSujos - (calcVolumes * 150)
    let volumes = calcVolumes;
    
    if(sobra) volumes++;

    setVolumes(volumes);
  })

  return {
    volumes
  }
}

export { useEtiqueta }