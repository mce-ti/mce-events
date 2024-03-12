import ViewShot from 'react-native-view-shot';
import * as Print from 'expo-print';
import { convertImageToPDF } from './convertImageToPDF';

const captureAndPrint = async (viewShotRef : React.RefObject<ViewShot>) => {

  if (!viewShotRef.current) {
    console.warn('ViewShot ref is not defined');
    return;
  }

  try {
    if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
      const uri = await viewShotRef.current.capture();
      // const uri = 'https://www.meucopoeco.com.br/assets/site/images/footer/logo-pix.png';
      if (uri) {
        const uriPDF = await convertImageToPDF(uri)

        Print.printAsync({ uri: uriPDF });

        console.log('Screenshot captured:', uriPDF);
      }
    } else {
      console.warn('ViewShot ref is not defined or capture() function is missing');
    }
  } catch (error) {
    console.error('Error while capturing screenshot:', error);
  }
};

export { captureAndPrint }