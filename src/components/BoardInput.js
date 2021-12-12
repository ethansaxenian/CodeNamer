import React, { useState } from "react";
import { StyleSheet, TextInput, View , Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import _ from "lodash";
import { Block, Button, Text} from "galio-framework";
import InvalidWordsModal from "./InvalidWordsModal";
import { API_SERVER_URL } from "../lib/utils";

const { width } = Dimensions.get('screen');

export default function BoardInput({ setAddingWords, setBoard }) {
  const [redWords, setRedWords] = useState("");
  const [blueWords, setBlueWords] = useState("");
  const [tanWords, setTanWords] = useState("");
  const [blackWords, setBlackWords] = useState("");
  const [invalidWords, setInvalidWords] = useState([]);

  const iter = _.zip(
    [redWords, blueWords, tanWords, blackWords],
    [setRedWords, setBlueWords, setTanWords, setBlackWords],
    ["red", "blue", "neutral", "assassin"],
    ["red", "blue", "tan", "black"]
  );

  const generateBoard = async () => {
    const newBoard = [];
    const wordLists = [[redWords, "red"], [blueWords, "blue"], [tanWords, "tan"], [blackWords, "black"]];
    wordLists.forEach(([words, color]) => {
      if (words !== "") {
        _.split(words, ",").forEach((word) => {
          newBoard.push({
            word: _.toLower(_.trim(word)),
            ogWord: _.toLower(_.trim(word)),
            color,
            ogColor: color,
            active: true
          })
        });
      }
    });

    const newBoardWithIDs = newBoard.map((obj, id) => ({...obj, id}));

    const allWords = newBoardWithIDs.map((obj) => _.replace(obj.word, " ", "_"));
    const response = await fetch(`${API_SERVER_URL}/validate-words?words=${_.join(allWords, "+")}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newInvalidWords = await response.json();

    console.log(newInvalidWords);

    if (newInvalidWords.length === 0) {
      setBoard(_.shuffle(newBoardWithIDs));
    } else {
      setInvalidWords(newInvalidWords);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} centerContent>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Block center>
              <Text h3 style={styles.header}>Manually Add Board</Text>
            </Block>
            {iter.map(([text, onChange, type, color]) => (
              <View key={type}>
                <Block center>
                  <Text h5>Enter <Text style={{color, fontWeight: "bold"}}>{type}</Text> words:</Text>
                </Block>
                <TextInput
                  autoCapitalize="none"
                  style={[styles.input, {color}]}
                  value={text}
                  onChangeText={onChange}
                  placeholder="Words must be a comma-separated list"
                />
              </View>
            ))}
            <Button
              style={[styles.button, {backgroundColor: 'green', marginTop: 20}]}
              onPress={() => generateBoard()}
            >
              Generate GameBoard
            </Button>
            <Button
              style={[styles.button, {backgroundColor: 'red'}]}
              onPress={() => setAddingWords(false)}
            >
              Back to Home Page
            </Button>
            {(invalidWords.length > 0) && <InvalidWordsModal words={invalidWords} setVisible={() => setInvalidWords([])}/>}
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    paddingVertical: 25,
  },
  input: {
    height: 40,
    width: 300,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: width/2,
    height: 40
  }
})
