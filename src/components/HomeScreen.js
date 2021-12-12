import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Text } from 'galio-framework';
import ImageInputs from './ImageInputs';
import BoardInput from './BoardInput';

export default function HomeScreen({ setBoard }) {
  const [addingWords, setAddingWords] = useState(false);
  return (
    <View style = {styles.container}>
      {addingWords ? (
        <BoardInput setAddingWords={setAddingWords} setBoard={setBoard}/>
      ) : (
        <ImageBackground source={require("../../assets/front.png")} resizeMode="cover" style={styles.image}>
          <Text style={styles.homeHeader}>CodeNamer</Text>
          <ImageInputs setBoard={setBoard} setAddingWords={setAddingWords} style={styles.contents}/>
        </ImageBackground>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: -5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  contents: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignContent: 'flex-start',
    position: 'absolute',
    marginTop: 150
  },
  homeHeader: {
    color: "white",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  }
});
