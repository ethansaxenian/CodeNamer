import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import _ from 'lodash';

export default function App() {
  const [words, setWords] = useState();
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

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setUserInput} value={userInput} placeholder="enter a word"/>
      <Button onPress={() => getWords()} disabled={!userInput} title="Get Words"/>
      {words ? (
        _.take(_.sortBy(_.toPairs(words), ([word, score]) => -score), 10).map(([word, score]) => <Text key={word}>{word}: {_.round(score, 3)}</Text>)
      ) : (
        <Text>loading...</Text>
      )}
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
