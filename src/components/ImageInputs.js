import React, { useEffect, useState } from "react";
import { Button, Block } from "galio-framework";
import { Text, View, StyleSheet } from "react-native";
import PickImage from "./PickImage";
import { API_SERVER_URL } from '../lib/constants';
import _ from "lodash";
import InvalidImageModal from "./InvalidImageModal";
import DevShortcut from "../temp/DevShortcut";

export default function ImageInputs({ setBoard }) {
  const [colors, setColors] = useState([]);
  const [words, setWords] = useState([]);
  const [modalText, setModalText] = useState("");
  const [imageType, setType] = useState("");


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

    if (fetchedGame.length !== 25) {
      setModalText("words");
    } else {
      setWords(fetchedGame);
    }
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

    if (fetchedColors.length !== 25) {
      setModalText("colors");
    } else {
      setColors(fetchedColors);
    }
  };


  return (
    <View flex={1} paddingTop={100}>
      {(modalText !== "") && (
        <InvalidImageModal modalText={modalText} setModalText={setModalText}/>
      )}
      {/* <DevShortcut setColors={setColors} setWords={setWords}/> */}
      <Block center>
        <Button color="white" onPress={()=>{setType("Game")}}>
          <Text style={styles.text}>Upload Game Board</Text>
        </Button>
      </Block>
      <Block center>
        <Button color="white"  onPress={()=>{setType("Color")}}>
          <Text style={styles.text}>Upload Color Card</Text>
        </Button>
      </Block>
      {(imageType !== "") && (
        <PickImage
          useImage={(imageType === "Game") ? readGameBoardImage : readColorCodeImage}
          visible={imageType !== ""}
          setVisible={setType}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
