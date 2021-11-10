import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, Block } from 'galio-framework';
import GameBoard from './GameBoard';
import ImageInputs from './ImageInputs';
import ClueSelector from './ClueSelector';
import _ from "lodash";

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
            <GameBoard board={board} view = {spyView} toggleWord={toggleWord}/>
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
