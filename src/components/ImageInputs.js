import React, { useEffect, useState } from "react";
import { Block } from "galio-framework";
import { Text, View } from "react-native";
import PickImage from "./PickImage";
import { API_SERVER_URL } from '../lib/constants';
import DevShortcut from '../temp/DevShortcut';
import _ from "lodash";

export default function ImageInputs({ setBoard }) {
  const [colors, setColors] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    if ((colors.length > 0) && (words.length > 0)) {
      // the board is represented as a list of objects
      const newBoard = _.zip(words, colors).map(([ word, color ]) => ({ word, color, active: true }));
      setBoard(newBoard);
    }
  }, [colors, words]);

  const readGameBoardImage = async (imgEncoding) => {
    const response = await fetch(`${API_SERVER_URL}/gameboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const fetchedGame = await response.json();
    setWords(fetchedGame);
  };

  const readColorCodeImage = async (imgEncoding) => {
    const response = await fetch(`${API_SERVER_URL}/colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const fetchedColors = await response.json();
    setColors(fetchedColors);
  };

  
  return (
    <View flex={1} paddingTop={50}>
      {/* <DevShortcut setWords={setWords} setColors={setColors}/> */}
      <Block center>
        <Text h5>Upload Game Board:</Text>
        <PickImage useImage={readGameBoardImage}/>
      </Block>
      <Block center>
        <Text h5>Upload Color Card:</Text>
        <PickImage useImage={readColorCodeImage}/>
      </Block>
    </View>
  )
}
