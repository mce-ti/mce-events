import * as FileSystem from 'expo-file-system'

export async function readFile(uri: string): Promise<string> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri)

    if (!fileInfo.exists) {
      throw new Error('Arquivo não existe');
    }

    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

    const last7 = uri.substring(uri.length - 7).toLocaleLowerCase()

    let ext = ''

    if (last7.includes('.png'))  ext = 'png'
    if (last7.includes('.jpg'))  ext = 'jpg'
    if (last7.includes('.jpeg')) ext = 'jpeg'

    return `data:image/${ext};base64,${base64}`
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error)

    throw error
  }
}
