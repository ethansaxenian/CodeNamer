import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, Block } from 'galio-framework';
import GameBoard from './GameBoard';
import ImageInputs from './ImageInputs';
import ClueSelector from './ClueSelector';
import _ from "lodash";
import { API_SERVER_URL } from '../lib/constants';
import DevShortcut from '../temp/DevShortcut';

export default function App() {
  const [colors, setColors] = useState(null);
  const [words, setWords] = useState(null);
  const [spyView, setView] = useState(true);

  const readColorCodeImage = async (imgEncoding) => {
    const response = await fetch(`${API_SERVER_URL}/colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const fetchedColors = await response.json();
    setColors(fetchedColors);
  };

  const readGameBoardImage = async (imgEncoding) => {
    const response = await fetch(`${API_SERVER_URL}/gameboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const fetchedGame = await response.json();
    setWords(fetchedGame);
  };

  // the board is represented as a list of objects
  const board = _.zip(words, colors).map(([ word, color ]) => ({ word, color }));

  return (
    <View style={styles.container}>
      <Block center>
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}> 
        <Text h3 style={{marginRight: 15}}>CodeNamer</Text>
          <TouchableOpacity onPress={()=>{setView(!spyView)}} style={styles.spyButton}>
          <Image style={styles.spyButton} source={spyView?require("../../assets/icon.png"): require("../../assets/player.png")}/>
          </TouchableOpacity>
        </View>
        {/* <DevShortcut setWords={setWords} setColors={setColors}/> */}
      </Block>
      {!(words && colors) ? (
        <ImageInputs getWords={readGameBoardImage} getColors={readColorCodeImage}/>
      ) : (
        <>
          <View flex={2}>
            <GameBoard board={board} view = {spyView}/>
          </View>
          <View flex={2}>
            <ClueSelector words={words} colors={colors} board={board}/>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  spyButton: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 40,
    height: 40
  },
});
