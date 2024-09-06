type FormMovementValues = {
  sujosQuantityByArt: { [key: number]: number | undefined }
  limposQuantityByArt: { [key: number]: number | undefined }
  quantity: number | null
  responsible: string
  responsible_pdv: string
  pdv: string 
  image: string
  signature: string
  sujos: number | null
  art: number | null
}

export const initialValues: FormMovementValues = {
  art: null,
  image: '',
  signature: '',
  quantity: null,
  sujos: null,
  pdv: '',
  responsible: '',
  responsible_pdv: '',
  sujosQuantityByArt: {},
  limposQuantityByArt: {}
}