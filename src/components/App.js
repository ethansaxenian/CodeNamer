import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Block } from 'galio-framework';
import GameBoard from './GameBoard';
import ImageInputs from './ImageInputs';
import ClueSelector from './ClueSelector';
import _ from "lodash";

export default function App() {
  const [board, setBoard] = useState([]);

  const toggleWord = (word) => {
    const newBoard = board.map((card) => {
      if (card.word === word) {
        return {...card, active: !card.active}
      } else {
        return card
      }
    });
    setBoard(newBoard);
  }

  return (
    <View style={styles.container}>
      <Block center>
        <Text h3>CodeNamer</Text>
      </Block>
      {(board.length == 0) ? (
        <ImageInputs setBoard={setBoard}/>
      ) : (
        <>
          <View flex={2} marginTop={50}>
            <GameBoard board={board} toggleWord={toggleWord}/>
          </View>
          <View flex={2}>
            <ClueSelector board={board}/>
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
