import { useState } from 'react';
import ViewShot from 'react-native-view-shot';
import * as Print from 'expo-print';
import { convertImageToPDF } from './convertImageToPDF';

const useCaptureAndPrint = (onPrintComplete: () => void) => {
  const [loading, setLoading] = useState(false);

  const captureAndPrint = async (viewShotRef: React.RefObject<ViewShot>) => {
    if (!viewShotRef.current) {
      console.warn('ViewShot ref is not defined');
      return;
    }

    try {
      setLoading(true);

      if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
        const uri = await viewShotRef.current.capture();
        if (uri) {
          const uriPDF = await convertImageToPDF(uri);
          await Print.printAsync({ uri: uriPDF });

          onPrintComplete();
        }
      } else {
        console.warn('ViewShot ref is not defined or capture() function is missing');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error while capturing screenshot:', error);
      setLoading(false);
    }
  };

  return { captureAndPrint, loading };
};

export default useCaptureAndPrint;
