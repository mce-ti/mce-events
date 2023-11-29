import { useEffect, useState } from 'react'
import { useAsyncStorage } from 'src/hooks'

import type { EventStorage, OperatorStorage, ArtStorage } from 'src/storage/storage.types'

type UseProductEntryProps = {
  id: number
}

const useProductEntry = ({ id }: UseProductEntryProps) => {
  const [quantityValue, setQauntityValue] = useState<string>('')
  const [responsibleValue, setResponsibleValue] = useState<string>('')
  const [imageValue, setImageValue] = useState<null|number>(null)
  const [artValue, setArtValue] = useState<null|number>(null)
  const [arts, setArts] = useState<ArtStorage[]>([])

  const { getItem } = useAsyncStorage()

  const loadInfos = async () => {
    // const operatorsStorage: OperatorStorage[] = await getItem('operators') || []
    // const eventStorage: EventStorage|null = await getItem('event')
    const artStorage: ArtStorage[] = await getItem('arts') || []

    setArts(artStorage)
  }

  useEffect(() => {
    loadInfos()
  }, [])

  const onQuantityChange = (value: string|number = 0) => {
    let newValue = ''

    if (typeof value === 'string') newValue = value.replace(/\D/g, "") || '0'

    newValue = parseInt(newValue).toString()

    setQauntityValue(newValue)
  }

  const saveMovement = async () => {
    const hasAllValues = (quantityValue && responsibleValue && artValue && imageValue)

    if (!hasAllValues) {
      alert('Preencha os campos corretamente')
      return;
    }
  }

  return {
    arts,
    artValue,
    setArtValue,
    quantityValue,
    onQuantityChange,
    responsibleValue,
    setResponsibleValue,
    saveMovement
  }
}

export { useProductEntry }