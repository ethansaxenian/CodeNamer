import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Block, Button, Text } from 'galio-framework';
import ImageInputs from './ImageInputs';
import BoardInput from './BoardInput';

export default function HomeScreen({ setBoard }) {
  const [addingWords, setAddingWords] = useState(false);

  return (
    <>
      {addingWords ? (
        <BoardInput setAddingWords={setAddingWords} setBoard={setBoard}/>
      ) : (
        <ImageBackground source={require("../../assets/front.png")} resizeMode="cover" style={styles.image}>
          <Text style={styles.homeHeader}>CodeNamer</Text>
          <ImageInputs setBoard={setBoard} style={styles.contents}/>
          <Block center>
            <Button color="white" onPress={() => setAddingWords(true)}>
              <Text style={styles.text}>Manually Add Board</Text>
            </Button>
          </Block>
        </ImageBackground>
      )}

    </>
  )
}


const styles = StyleSheet.create({
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
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  }
});
