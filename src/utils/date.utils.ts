export function formatDBDate(date: string|null|undefined): string {
  if (!date) return ''

  const dateSplit = date.split('-')

  const result = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

  return result
}