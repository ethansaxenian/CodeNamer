import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('loading...');

  const userInput = "tree";

  const getMessage = async () => {
    const response = await fetch("http://localhost:3001/gensim", {
      method: "POST",
      body: JSON.stringify({
        arg: userInput
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchedMessage = await response.json();
    setMessage(fetchedMessage);
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => getMessage()} title="Click me"/>
      <Text>{message}</Text>
      <StatusBar style="auto" />
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
});
