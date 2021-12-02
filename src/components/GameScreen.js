import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'galio-framework';
import GameBoard from './GameBoard';
import ClueSelector from './ClueSelector';
import GameControls from './GameControls';

export default function GameScreen({ board, setBoard }) {
  const [spyView, setView] = useState(true);

  const editWord = (id, word, color) => {
    const newBoard = board.map((card) => {
      if (card.id === id) {
        return {...card, word, color}
      } else {
        return card
      }
    });
    setBoard(newBoard);
  }

  const toggleWord = (id) => {
    const newBoard = board.map((card) => {
      if (card.id === id) {
        return {...card, active: !card.active}
      } else {
        return card
      }
    });
    setBoard(newBoard);
  }

  return (
    <>
      {!spyView ? (
        <ImageBackground source={require("../../assets/logo.png")} resizeMode="cover" style={styles.image}>
          <Text h3 style={styles.spyHeader}>CodeNamer</Text>
        </ImageBackground>
      ) : (
        (board.length != 0) && <Text style={styles.gameHeader}>CodeNamer</Text>
      )}
      <View style={styles.contents}>
        <GameBoard board={board} view={spyView} toggleWord={toggleWord} editWord={editWord}/>
        <GameControls board={board} setBoard={setBoard} spyView={spyView} setView={setView}/>
        <ClueSelector board={board}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  contents:{
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignContent: 'flex-start',
    position: 'absolute',
    marginTop: 150
  },
  gameHeader: {
    color: "black",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  spyHeader: {
    flex: 1,
    color: "white",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
