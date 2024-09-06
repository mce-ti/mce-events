export function formatBRL(value: string|number|null|undefined): string {
  if(!value) return '';

  const valor = value;

  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return valorFormatado
}