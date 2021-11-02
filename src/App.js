import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import GameBoard from './GameBoard';
import ImageInputs from './ImageInputs';
import ClueSelector from './ClueSelector';
import _ from "lodash";

export default function App() {
  const [colors, setColors] = useState([]);
  const [words, setWords] = useState([]);

  const readColorCodeImage = async (imgEncoding) => {
    const response = await fetch(`http://127.0.0.1:5000/colors`, {
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
    const response = await fetch(`http://127.0.0.1:5000/gameboard`, {
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

  createMockBoard = () => {
    setWords(["hello"])
    setColors(["red"])
  }

  return (
    <View style={styles.container}>
      <Block center>
        <Text h3>CodeNamer</Text>
        <Button onPress={createMockBoard}>Generate Mock Board</Button>
      </Block>
      {(board.length == 0) ? (
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
