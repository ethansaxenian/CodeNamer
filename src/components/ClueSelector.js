import { Block, Button, Text } from "galio-framework";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import _ from "lodash";
import { API_SERVER_URL } from "../lib/constants";

export default function ClueSelector({ board }) {
  const [clues, setClues] = useState([]);
  const [clueColor, setClueColor] = useState("");

  const getHint = async (color) => {
    const boardObject = {
      red: [],
      blue: [],
      tan: [],
      black: []
    }

    board.forEach(({ word, color }) => {
      boardObject[color].push(word);
    });

    const queryString = `?red=${_.join(boardObject.red, "+")}`    +
                        `&blue=${_.join(boardObject.blue, "+")}`  +
                        `&tan=${_.join(boardObject.tan, "+")}`    +
                        `&black=${_.join(boardObject.black, "+")}`;

    const response =  await fetch(`${API_SERVER_URL}/clues/${color}${queryString}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newClues = await response.json();
    setClues(newClues);
    setClueColor(color);
  };

  return (
    <Block center>
      <Button color="primary" onPress={() => getHint("red")}>Get Red Hint</Button>
      <Button color="info" onPress={() => getHint("blue")}>Get Blue Hint</Button>
      {(clues.length > 0) && (
        <View marginTop={50} style={{flexDirection: 'row'}}>
          <FlatList
            data={clues}
            renderItem={({ item }) => (
              <Text h6 style={[styles.clue, { color: clueColor }]}>
                {_.upperFirst(item.word)} {item.cards.length}:
              </Text>
            )}
          />
          <FlatList
            data={clues}
            renderItem={({ item }) => (
              <Text h6 style={styles.cards}>
                {_.join(item.cards.map((card) => _.upperFirst(card)), ", ")}
              </Text>
            )}
          />
        </View>
      )}
    </Block>
  )
}

const styles = StyleSheet.create({
  clue: {
    fontWeight: 'bold',
    paddingVertical: 15
  },
  cards: {
    paddingLeft: 15,
    paddingVertical: 15
  }
})
