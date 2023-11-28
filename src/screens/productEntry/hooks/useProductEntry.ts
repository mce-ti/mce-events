import { useState } from 'react'

const useProductEntry = () => {
  const [artValue, setArtValue] = useState<null|number>(null)

  return {
    artValue,
    setArtValue
  }
}

export { useProductEntry }