import React, { useEffect, useState, useRef } from "react";
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from "galio-framework";
import Modal from 'react-native-modal';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';

export default function PickImage({ useImage, visible, setVisible }) {
  const close = () => setVisible("");


  const choosePhoto = async () => {
    await ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      freeStyleCropEnabled: true,
      height: 720,
      width: 1280,
      cropping: true,
      writeTempFile: false,
      forceJpg: true,
      compressImageQuality: 1,
    })
      .then(image=>{
        useImage(image.data);
      }).catch(function () {
        console.log("Promise Rejected");
      }).finally(close);
  };

  const takePhoto = () => {

    ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
      freeStyleCropEnabled: true,
      height: 720,
      width: 1280,
      cropping: true,
      writeTempFile: false,
      forceJpg: true,
      compressImageQuality: 1,
    })
      .then(image => {
        useImage(image.data);
      }).catch(function () {
        console.log("Promise Rejected");
      }).finally(close);
  };


  return (
    <>
      <Modal
        onBackButtonPress={close}
        onBackdropPress={close}
        isVisible = {visible}
        style={{justifyContent: 'flex-end', margin: 0}}>
          <SafeAreaView style={styles.options}>
          <Pressable style={styles.option} onPress={()=>{choosePhoto()}}>
          <Icon name="images" family="entypo" size={30} />
            <Text>Library </Text>
          </Pressable>
          <Pressable style={styles.option} onPress={()=>{takePhoto()}}>
          <Icon name="camera" family="entypo" size={30} />
            <Text>Camera</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  options: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    paddingTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
