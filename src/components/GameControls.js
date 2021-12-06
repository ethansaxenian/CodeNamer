import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'galio-framework';

export default function GameControls({ board, setBoard, spyView, setView}) {
  const resetBoard = () => {
    const newBoard = board.map((card) =>  ({...card, word: card.ogWord, color: card.ogColor, active: true}));
    setBoard(newBoard);
  }

  return (
    <View style={styles.container}>
      <Button onPress={()=>{setView(!spyView)}} style={styles.spyButton}>{spyView ? "Player View" : "Spy View"}</Button>
      <Button onPress={()=>{resetBoard()}} style={styles.spyButton}>Reset</Button>
      <Button onPress={()=>{setBoard([]), setView(true)}} style={styles.spyButton}>New Game</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  spyButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 100,
    height: 40
  },
});
