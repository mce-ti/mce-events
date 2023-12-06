type FormMovementValues = {
  quantity: number | null
  responsilbe: string
  image: string
  art: number | null
}

export const initialValues: FormMovementValues = {
  art: null,
  image: '',
  quantity: null,
  responsilbe: ''
}