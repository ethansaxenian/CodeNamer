import React from "react";
import { Block } from "galio-framework";
import { Text, View } from "react-native";
import ImagePicker from "./ImagePicker";

export default function ImageInputs({ getWords, getColors }) {
  return (
    <View flex={1} paddingTop={50}>
      <Block center>
        <Text h5>Upload Game Board:</Text>
        <ImagePicker useImage={getWords}/>
      </Block>
      <Block center>
        <Text h5>Upload Color Card:</Text>
        <ImagePicker useImage={getColors}/>
      </Block>
    </View>
  )
}
