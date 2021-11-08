import React from "react";
import { Block } from "galio-framework";
import { Text, View } from "react-native";
import PickImage from "./ImagePicker";

export default function ImageInputs({ getWords, getColors }) {
  return (
    <View flex={1} paddingTop={50}>
      <Block center>
        <Text h5>Upload Game Board:</Text>
        <PickImage useImage={getWords}/>
      </Block>
      <Block center>
        <Text h5>Upload Color Card:</Text>
        <PickImage useImage={getColors}/>
      </Block>
    </View>
  )
}
