import { Block, Button, Text, Accordion } from "galio-framework";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import _ from "lodash";
import { API_SERVER_URL, fetchWithTimeout } from "../lib/utils";

import HintInput from './HintInput';

export default function ClueSelector({ board }) {
  const [clueColor, setClueColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [redClues, setRedClues] = useState([]);
  const [blueClues, setBlueClues] = useState([]);

  const [match, setMatches] = useState([]);
  const [hint, setHint] = useState({});
  const [hintInput, getHintInput] = useState(false);

  const [display, toggleDisplay] = useState(true);

  useEffect(() => {
    setRedClues([]);
    setBlueClues([]);
    setClueColor("");
    setLoading(false);
    setHint([]);
    setMatches([])
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
          boardObject[color].push(_.replace(word, " ", "_"));
        }
      });

      const queryString = (boardObject.red.length > 0   ? `red=${_.join(boardObject.red, "+")}`      : "") +
                          (boardObject.blue.length > 0  ? `&blue=${_.join(boardObject.blue, "+")}`   : "") +
                          (boardObject.tan.length > 0   ? `&tan=${_.join(boardObject.tan, "+")}`     : "") +
                          (boardObject.black.length > 0 ? `&black=${_.join(boardObject.black, "+")}` : "");

      try {
        const response = await fetchWithTimeout(`${API_SERVER_URL}/clues/${clueColor}?${queryString}`);
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

      } catch (error) {
        setLoading(false);
      }
    };

    if (((clueColor === "blue") && (blueClues.length === 0)) || ((clueColor === "red") && (redClues.length === 0))) {
      getHint();
    }

  }, [clueColor]);

  useEffect(() => {
    const getMatch = async () => {
      setLoading(true);

      const hintWord = hint.word;
      const hintNum = hint.num;

      const boardObject = {
        red: [],
        blue: [],
        tan: [],
        black: []
      }

      board.forEach(({ word, color, active }) => {
        if (active) {
          boardObject[color].push(_.replace(word, " ", "_"));
        }
      });

      const queryString = (boardObject.red.length > 0   ? `red=${_.join(boardObject.red, "+")}`      : "") +
                          (boardObject.blue.length > 0  ? `&blue=${_.join(boardObject.blue, "+")}`   : "") +
                          (boardObject.tan.length > 0   ? `&tan=${_.join(boardObject.tan, "+")}`     : "") +
                          (boardObject.black.length > 0 ? `&black=${_.join(boardObject.black, "+")}` : "") +
                          (hintNum ? `&num=${hintNum}`: "");

      try {
        const response = await fetchWithTimeout(`${API_SERVER_URL}/match/${hintWord}?${queryString}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const matchObject = await response.json();

        if(matchObject){
            setMatches(matchObject);
        }
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    };

    if ((hint.word) && (hint.num >= 1)) {
      getMatch();
    }

  }, [hint]);

  const clues = {red: redClues, blue: blueClues}[clueColor] || [];
  

  const getClueString = (n) => {
    const cluesByNum = clues.filter(( clue ) => +clue.num === n);
    return cluesByNum.map((clue)=>{
      return(
        <View style = {styles.clueContainer} key={clue.word}>
          <Text style={[styles.clue, { color: clueColor }]}>
            {_.upperFirst(clue.word)}:{" "}
          </Text>
          <Text style={styles.cards}>
            {_.join(clue.cards, ", ")}
        </Text>
        </View>
      );
    });
  }

  const formattedClues = clues ? [
    { title: "Clues for 2", content: <Text>{getClueString(2)}</Text>},
    { title: "Clues for 3", content: <Text>{getClueString(3)}</Text>},
    { title: "Clues for 4", content: <Text>{getClueString(4)}</Text>},
  ] : [];

  const formattedMatch= match ? [
    { title: "Operative Results", content: <Text>{hint.word} for {hint.num}: {match.join(", ")}</Text>},
  ] : [];

  return (
    <View>
      <Block center>
        <View style={styles.clueContainer}>
          <Button  color="primary" onPress={() => {setClueColor("red"); toggleDisplay(true)}}>Get Red Hint</Button>
          <Button  color="info" onPress={() => {setClueColor("blue"); toggleDisplay(true)}}>Get Blue Hint</Button>
        </View>
        <Button  color="warning" onPress={() => { getHintInput(true); toggleDisplay(false)}}>Get Operative Intel</Button>
        <ActivityIndicator animating={loading} size="large" style={styles.animator}/>
        {((clues.length > 0 && display) || (match.length > 0 && !display) && !loading)&&(
          <View style={{ width: 350, flexDirection: "row", justifyContent: 'space-evenly', marginTop:display?-75:-50, paddingBottom:50 }}>
            <Accordion dataArray={display?formattedClues: formattedMatch}/>
          </View>
        )}
      </Block>
      {hintInput && <HintInput setHint={setHint} hintInput={hintInput} getHintInput={getHintInput} scrollEnabled={false}/>}
    </View>
  )
}



const styles = StyleSheet.create({
  clueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight:20,
    paddingTop:5,
    paddingLeft:20,
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
  animator:{
    paddingTop: 50,
  },
})
