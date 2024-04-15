type FormMovementValues = {
  quantityByArt: { [key: number]: number | undefined } // Um objeto onde a chave é o ID da arte e o valor é a quantidade associada
  quantity: number | null
  responsible: string
  image: string
  art: number | null
}

export const initialValues: FormMovementValues = {
  art: null,
  image: '',
  quantity: null,
  responsible: '',
  quantityByArt: {}
}