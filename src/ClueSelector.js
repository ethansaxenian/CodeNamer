import { Block, Button, Text } from "galio-framework";
import React, { useState } from "react";
import { View } from "react-native";
import _ from "lodash";

export default function ClueSelector({ board }) {
  const [clue, setClue] = useState();
  const [clueNum, incClueNum] = useState(0);

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

    const queryString = `?${_.join(boardObject.red, "+")}&${_.join(boardObject.blue, "+")}&${_.join(boardObject.tan, "+")}&${_.join(boardObject.black, "+")}`

    const response =  await fetch(`http://127.0.0.1:5000/clues/${color}${queryString}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newClues = await response.json();
    setClue(newClues[clueNum]);
    incClueNum(clueNum+1);
  };

  return (
    <Block center>
      <Button color="info" onPress={() => getHint("blue")}>Get Blue Hint</Button>
      <Button onPress={() => getHint("red")}>Get Red Hint</Button>
      {clue && (
        <View marginTop={50}>
          <Text h6>
            Cards: {_.join(clue.cards.map((card) => _.upperFirst(card)))}
          </Text>
          <Text h6>
            Hint: {_.upperFirst(clue.word)}
          </Text>
        </View>
      )}
    </Block>
  )
}
