import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Platform } from 'react-native';
import ImagePicker, { ImagePickerResponse, CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const TakePicture: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo', // Definindo o tipo de mídia como foto
      saveToPhotos: false,
      quality: 1,
      cameraType: 'front'
    };

    const result = await launchImageLibrary(options);
    console.log(result)
  };

  const handleResponse = (response: ImagePickerResponse | null) => {
    if (response) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        const source = { uri: response.assets[0].uri };
        setPhoto(response.assets[0].uri);
      }
    } else {
      console.log('Error selecting image');
    }
  };

  return (
    <View>
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Text>Choose Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export {TakePicture};
