import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import _ from 'lodash';
import Images from './ImagePicker';

export default function App() {
  const [words, setWords] = useState();
  const[colorImage, setColorImage] = useState(null);
  const[gameImage, setGameImage] = useState(null);
  const[colors, setColors] = useState(null);
  const[game, setGame] = useState(null);
  const [userInput, setUserInput] = useState("");

  const getWords = async () => {
    setWords();
    const response =  await fetch(`https://code-namer.herokuapp.com/clues/${userInput.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchedWords = await response.json();
    setWords(fetchedWords);
  }

  useEffect(() => {
    const getColorCode = async(imgEncoding) => {
      const response =  await fetch(`http://127.0.0.1:5000/colors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: imgEncoding
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const fetchedColors = await response.json();
      setColors(fetchedColors);
      return fetchedColors
    };

    if(colorImage){
       getColorCode(colorImage.base64);
    }
  }, [colorImage]);

  useEffect(() => {
    const getGameBoard = async(imgEncoding) => {
      const response =  await fetch(`http://127.0.0.1:5000/gameboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: imgEncoding
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const fetchedGame = await response.json();
      setGame(fetchedGame);
      console.log(fetchedGame);
      return fetchedGame
    };

    if(gameImage){
       getGameBoard(gameImage.base64);
    }
  }, [gameImage]);

  return (
    <View style={styles.container}>
      {colorImage?  <Text>Color Card: </Text>: <Text>Upload your Color Card: </Text>}
      {colorImage?( <Image source={{ uri: colorImage.uri }} style={{ width: 200, height: 200 }}/>): <Images setImage = {setColorImage}/>}
      {colors?  <Text>{colors}</Text>: null}
      {/* <TextInput style={styles.input} onChangeText={setUserInput} value={userInput} placeholder="enter a word"/>
      <Button onPress={() => getWords()} disabled={!userInput} title="Get Words"/>
      {words ? (
        _.take(_.sortBy(_.toPairs(words), ([word, score]) => -score), 10).map(([word, score]) => <Text key={word}>{word}: {_.round(score, 3)}</Text>)
      ) : (
        <Text>loading...</Text>
      )} */}
      {gameImage? <Text>Game Board: </Text>:  <Text>Upload your Game Board: </Text>}
      {gameImage?  <Image source={{ uri: gameImage.uri }} style={{ width: 300, height: 200 }}/>: <Images setImage = {setGameImage}/>}
      {game?  <Text>{game}</Text>: null}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});