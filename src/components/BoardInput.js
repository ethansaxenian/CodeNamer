import React, { useState } from "react";
import { StyleSheet, TextInput, SafeAreaView, View } from "react-native";
import _ from "lodash";
import { Block, Button, Text} from "galio-framework";

export default function BoardInput({ setAddingWords, setBoard }) {
  const [redWords, setRedWords] = useState("");
  const [blueWords, setBlueWords] = useState("");
  const [tanWords, setTanWords] = useState("");
  const [blackWords, setBlackWords] = useState("");

  const iter = _.zip(
    [redWords, blueWords, tanWords, blackWords],
    [setRedWords, setBlueWords, setTanWords, setBlackWords],
    ["red", "blue", "neutral", "assassin"]
  );

  const generateBoard = () => {
    const newBoard = [];
    const wordLists = [[redWords, "red"], [blueWords, "blue"], [tanWords, "tan"], [blackWords, "black"]];
    wordLists.forEach(([words, color]) => {
      if (words !== "") {
        _.split(words, ",").forEach((word) => {
          newBoard.push({
            word: _.toLower(_.trim(word)),
            color,
            active: true
          })
        });
      }
    });

    setBoard(newBoard);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Block center>
        <Text h3 style={styles.header}>Manually Add Board</Text>
      </Block>
      {iter.map(([text, onChange, type]) => (
        <View key={type}>
          <Block center>
            <Text h5>Enter {type} words:</Text>
          </Block>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChange}
            placeholder="Words must be a comma-separated list"
          />
        </View>
      ))}
      <View style={styles.buttonGroup}>
        <Button style={styles.button} onPress={() => setAddingWords(false)}>Back to Home Page</Button>
        <Button style={styles.button} onPress={() => generateBoard()}>Generate GameBoard</Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    margin: "auto",
  },
  header: {
    paddingBottom: 50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 200,
    height: 40
  },
})
