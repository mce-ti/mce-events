import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

const convertImageToPDF = async (uriImg: string) => {
  try {
    // Caminho da imagem PNG
    const imageUri = uriImg;
    const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

    const htmlContent = `
      <html>
        <head>
          <style>
            html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
            }
            img {
              height: 90%;
            }
          </style>
        </head>
        <body>
          <img src="data:image/png;base64,${imageBase64}" />
        </body>
      </html>`
      ;

    // Cria o PDF
    const pdfData = await Print.printToFileAsync({ html: htmlContent });

    return pdfData.uri;
  } catch (error) {
    console.error('Erro ao converter imagem para PDF:', error);
  }
};

export { convertImageToPDF }