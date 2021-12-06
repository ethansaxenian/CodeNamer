import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Text } from 'galio-framework';
import GameBoard from './GameBoard';
import ClueSelector from './ClueSelector';
import GameControls from './GameControls';

export default function GameScreen({ board, setBoard }) {
  const [spyView, setView] = useState(false);

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
    <ImageBackground
      source={spyView ? require("../../assets/logo.png") : require("../../assets/white-background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView
        style={{backgroundColor: spyView ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0)"}}
        showsVerticalScrollIndicator={false}
        centerContent
      >
        <Text style={[styles.header, {color: spyView ? "white" : "black"}]}>CodeNamer</Text>
        <GameBoard board={board} spyView={spyView} toggleWord={toggleWord} editWord={editWord}/>
        <GameControls board={board} setBoard={setBoard} spyView={spyView} setView={setView}/>
        <ClueSelector board={board}/>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  }
});
