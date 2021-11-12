import { Block, Button, Text, Accordion } from "galio-framework";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import _ from "lodash";
import { API_SERVER_URL } from "../lib/constants";
import ClueViewer from "./ClueViewer";

export default function ClueSelector({ board }) {
  const [clueColor, setClueColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [redClues, setRedClues] = useState([]);
  const [blueClues, setBlueClues] = useState([]);

  useEffect(() => {
    setRedClues([]);
    setBlueClues([]);
    setClueColor("");
  }, [board]);

  useEffect(() => {
    const getHint = async () => {
      setLoading(true);

      const boardObject = {
        red: [],
        blue: [],
        tan: [],
        black: []
      }

      board.forEach(({ word, color, active }) => {
        if (active) {
          boardObject[color].push(word);
        }
      });

      const queryString = `?red=${_.join(boardObject.red, "+")}`    +
                          `&blue=${_.join(boardObject.blue, "+")}`  +
                          `&tan=${_.join(boardObject.tan, "+")}`    +
                          `&black=${_.join(boardObject.black, "+")}`;

      const response =  await fetch(`${API_SERVER_URL}/clues/${clueColor}${queryString}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const cluesObject = await response.json();

      const newClues = [];
      _.keys(cluesObject).forEach((num) => {
        cluesObject[num].forEach((clue) => {
          newClues.push({...clue, num, id: `${clue.word}${num}`})
        });
      });

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

  let clues = [];
  let formattedClues = [];

  useEffect(() => {
    clues = {red: redClues, blue: blueClues}[clueColor];
    if(clues){
      let entry = {
        title: "",
        contents: ""
      }
      formattedClues = [2, 3, 4].map(function(n){
        entry.title = `Clues for ${n}`;
        cluesByNum=clues.map(( clue ) => clue.num === n);
        entry.contents = cluesByNum.map=( function(item ) {
          const clu
          return(<Block>
            <Text h6 style={[styles.clue, { color: clueColor }]}>
              {_.upperFirst(item.word)} {item.cards.length}:
            </Text>
            <Text h6 style={styles.cards}>
              {_.join(item.cards.map((card) => _.upperFirst(card)), ", ")}
            </Text>
          </Block>);
        });
        console.log(entry);
        return entry;
      })
    }
    console.log(formattedClues);
  }, [redClues, blueClues]);

  return (
    <Block center>
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
        <Button color="primary" onPress={() => setClueColor("red")}>Get Red Hint</Button>
        <Button color="info" onPress={() => setClueColor("blue")}>Get Blue Hint</Button>
      </View>
      <ActivityIndicator animating={loading} size="large"/>
      {(clues.length > 0 && !loading) && (
        // <ClueViewer clues={clues} clueColor={clueColor}/>
        <View>
            <Accordion dataArray = {formattedClues}/>
        </View>
      )}
    </Block>
  )
}
