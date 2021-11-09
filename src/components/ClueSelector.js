import { Block, Button, Text, Accordion } from "galio-framework";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, Dimensions } from "react-native";
import _ from "lodash";
import { API_SERVER_URL } from "../lib/constants";
import { margin } from "@mui/system";

const { width } = Dimensions.get('screen');

export default function ClueSelector({ board }) {
  const [clueColor, setClueColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [redClues, setRedClues] = useState([]);
  const [blueClues, setBlueClues] = useState([]);

  useEffect(() => {
    const getHint = async () => {
      setLoading(true);

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

      const response =  await fetch(`${API_SERVER_URL}/clues/${clueColor}${queryString}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const newClues = await response.json();

      if (clueColor === "red") {
        setRedClues(newClues);
      } else if (clueColor === "blue") {
        setBlueClues(newClues);
      }

      setLoading(false);
    };

    if (((clueColor === "blue") && (blueClues.length === 0)) || ((clueColor === "red") && (redClues.length === 0))) {
      getHint();
    }

  }, [clueColor]);

  const clues = {red: redClues, blue: blueClues}[clueColor] || [];

  const data = [
    { title: "4 Card Hints", content: "Lorem ipsum dolor sit amet"},
    { title: "3 Card Hints", content: "Lorem ipsum dolor sit amet" },
    { title: "2 Card Hints", content: "Lorem ipsum dolor sit amet" }
  ];

  return (
    <Block center>
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}> 
      <Button color="primary" onPress={() => setClueColor("red")}>Get Red Hint</Button>
      <Button color="info" onPress={() => setClueColor("blue")}>Get Blue Hint</Button>
      </View> 
      {/* <Block style={{ height: 200 }}>
      <Accordion dataArray={data} />
      </Block> */}
      <ActivityIndicator animating={loading} size="large"/>
      {(clues.length > 0 && !loading) && (
        <View style={{flexDirection: 'row', padding: 15}}>
          <FlatList
            data={clues}
            renderItem={({ item }) => (
              <View>
              <Text h6 style={[styles.clue, { color: clueColor }]}>
                {_.upperFirst(item.word)} {item.cards.length}:
              </Text>
              <Text h6 style={styles.cards}>
              {_.join(item.cards.map((card) => _.upperFirst(card)), ", ")}
            </Text>
            </View>
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
  },
})
