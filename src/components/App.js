import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';

export default function App() {
  const [board, setBoard] = useState([]);

  return (
    <View style={styles.container}>
      {(board.length == 0) ? (
        <HomeScreen setBoard={setBoard}/>
      ) : (
        <GameScreen board={board} setBoard={setBoard}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
