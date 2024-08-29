type FormMovementValues = {
  sujosQuantityByArt: { [key: number]: number | undefined }
  limposQuantityByArt: { [key: number]: number | undefined }
  quantity: number | null
  responsible: string
  image: string
  signature: string
  art: number | null
}

export const initialValues: FormMovementValues = {
  art: null,
  image: '',
  quantity: null,
  responsible: '',
  sujosQuantityByArt: {},
  limposQuantityByArt: {}
}