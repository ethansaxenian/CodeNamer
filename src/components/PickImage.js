import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, View, Dimensions } from 'react-native';


const { width } = Dimensions.get('screen');

export default function PickImage({ useImage }) {
  const choosePhoto = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      freeStyleCropEnabled: true,
      height: 720,
      width: 1280,
      cropping: true,
      writeTempFile: false,
      compressImageQuality: 1, 
    })
      .then(image => {
        useImage(image.data);
      });
  };

  const takePhoto = () => {

    const options = {
      title: 'Take Photo',
      mediaType: 'photo',
    };

    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.errorMessage) {
        console.log('User tapped custom button: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        useImage(source.base64);
        console.log(source)
      }
    });
  };


  return (
    <View>
      <Button onPress={() => takePhoto()} title="Take a photo with the camera."/>
      <Button onPress={() => choosePhoto()} title="Or choose a photo from your filesystem."/>
    </View>
  );
}
