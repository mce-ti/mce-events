export const formatTextLenght = (text : string, limit: number) => {
  const textoLimitado = text.length > limit ? text.substring(0, limit) + '...' : text;

  return textoLimitado;
}