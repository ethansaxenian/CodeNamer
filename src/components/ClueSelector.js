import { Block, Button, Text, Accordion } from "galio-framework";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import _, { wrap } from "lodash";
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

  const getClueString = (n, clues) =>{
    let cluesByNum=clues.filter(( clue ) => clue.num == n);
    let cluecontents = cluesByNum.map((clue)=>{
      return(<View style = {styles.clueContainer}>
      <Text style={[styles.clue, { color: clueColor }]}>
        {_.upperFirst(clue.word)}:{" "}
      </Text>
      <Text style={styles.cards}>
        {_.join(clue.cards.map((card) => _.upperFirst(card)), ", ")}
     </Text>
    </View>);
    });
    
    return cluecontents;
  }

  let clues = {red: redClues, blue: blueClues}[clueColor] || [];
  let formattedClues = [];

  if(clues){
    formattedClues = [
      { title: "Clues for 2", content: <Text style = {styles.textContainer}>{getClueString(2, clues)}</Text>},
      { title: "Clues for 3", content: <Text style = {styles.textContainer}>{getClueString(3, clues)}</Text>},
      { title: "Clues for 4", content: <Text style = {styles.textContainer}>{getClueString(4, clues)}</Text>}, 
    ];

  }


  return (
    <Block center>
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
        <Button color="primary" onPress={() => setClueColor("red")}>Get Red Hint</Button>
        <Button color="info" onPress={() => setClueColor("blue")}>Get Blue Hint</Button>
      </View>
      <ActivityIndicator animating={loading} size="large"/>
      
      {(clues.length > 0 && !loading)?
        <View style={{ width: 350, flexDirection: "row", justifyContent: 'space-evenly' }}><Accordion dataArray = {formattedClues}/></View>:null
      }
    </Block>
  )
}



const styles = StyleSheet.create({
  clueList: {
    borderWidth: 1,
    borderRadius: 8
  },
  clueContainer: {
    flexDirection: "row", 
    justifyContent: "space-evenly",
    paddingRight:20,
    paddingTop:5,
    paddingLeft:20,
  },
  textContainer: {
    flexDirection: "column", 
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18
  },
  clue: {
    fontWeight: 'bold',
    fontSize: 13,
    margin: "auto"
  },
  cards: {
    fontSize: 12,
    margin: "auto"
  },
})
