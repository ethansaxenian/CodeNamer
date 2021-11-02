import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Images({getImage}) {

    const choosePhoto = () => {
        const options = {
        title: 'Select Image',
        mediaType: 'photo', 
        includeBase64: true
        };
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
            //response = response.assets[0];
            console.log('Response = ', response.assets[0].uri);
        
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
            console.log('User tapped custom button: ', response.errorMessage);
            } else {
            const source = { uri: response.assets[0].uri, base64: response.assets[0].base64 };
            getImage(source.base64);
            }
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
            getImage(source.base64);
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});