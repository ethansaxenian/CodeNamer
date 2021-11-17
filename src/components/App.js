import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'galio-framework';
import GameBoard from './GameBoard';
import ImageInputs from './ImageInputs';
import ClueSelector from './ClueSelector';
import GameControls from './GameControls';

export default function App() {
  const [board, setBoard] = useState([]);
  const [spyView, setView] = useState(true);

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
      {!spyView ? (
        <ImageBackground source={require("../../assets/logo.png")} resizeMode="cover" style={styles.image}>
          <Text h3 style={styles.spyText}>CodeNamer</Text>
        </ImageBackground>
      ) : ((board.length != 0) ? 
        <Text style={styles.gameHeader}>CodeNamer</Text>:null
      )}
      {(board.length == 0) ? (
        <ImageBackground source={require("../../assets/front.png")} resizeMode="cover" style={styles.image}>
        <Text style={styles.startHeader}>CodeNamer</Text>
        <ImageInputs setBoard={setBoard} style={styles.contents}/>
        </ImageBackground>    
      ) : (
        <View style={styles.contents}>
          <GameBoard board={board} view={spyView} toggleWord={toggleWord}/>
          <GameControls board={board} setBoard={setBoard} spyView={spyView} setView={setView}/>
          <ClueSelector board={board}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  gameHeader: {
    color: "black",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  spyText: {
    flex:1,
    color: "white",
    fontSize: 42,
    paddingTop: 75,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
