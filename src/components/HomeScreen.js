import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'galio-framework';
import ImageInputs from './ImageInputs';

export default function HomeScreen({ setBoard }) {

  return (
    <ImageBackground source={require("../../assets/front.png")} resizeMode="cover" style={styles.image}>
      <Text style={styles.startHeader}>CodeNamer</Text>
      <ImageInputs setBoard={setBoard} style={styles.contents}/>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  image: {
    flex:1,
    justifyContent: 'center',
  },
  contents:{
    justifyContent: 'space-evenly',
    flexDirection:'column',
    alignContent:'flex-start',
    position: 'absolute',
    marginTop: 150
  },
  startHeader:{
    color: "white",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  }
});
