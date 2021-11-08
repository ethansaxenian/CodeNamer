import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
        <Text h3>CodeNamer</Text>
        {/* <DevShortcut setWords={setWords} setColors={setColors}/> */}
      </Block>
      {!(words && colors) ? (
        <ImageInputs getWords={readGameBoardImage} getColors={readColorCodeImage}/>
      ) : (
        <>
          <View flex={2} marginTop={50} >
            <GameBoard board={board}/>
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
});
