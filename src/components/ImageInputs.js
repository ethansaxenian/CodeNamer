import React, { useEffect, useState } from "react";
import { Button, Block } from "galio-framework";
import { Text, View, StyleSheet, RecyclerViewBackedScrollViewBase } from "react-native";
import PickImage from "./PickImage";
import { API_SERVER_URL } from '../lib/constants';
import _ from "lodash";
import LoadImage from "./LoadImage";
import DevShortcut from "../temp/DevShortcut";
import Modal from 'react-native-modal';

export default function ImageInputs({ setBoard }) {
  const [colors, setColors] = useState([]);
  const [words, setWords] = useState([]);
  const [modalText, setModalText] = useState("");
  const [imageType, setType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((colors.length > 0) && (words.length > 0)) {
      // the board is represented as a list of objects
      const newBoard = _.zip(words, colors).map(([ word, color ]) => ({ word, color, active: true }));
      setBoard(newBoard);
    }
  }, [colors, words]);

  const readGameBoardImage = async (imgEncoding) => {
    setWords([]);
    setLoading(true);
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
    setLoading(false);
  };

  const readColorCodeImage = async (imgEncoding) => {
    setColors([]);
    setLoading(true);
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
    setLoading(false);
  };


  return (
    <View flex={1} paddingTop={100} height={'100%'} width={'100%'}>
      {(modalText !== "" || loading) && (
        <LoadImage modalText={modalText} setModalText={setModalText} isLoading={loading} flex={1}/>
      )}
      <DevShortcut setColors={setColors} setWords={setWords}/>
      <Block center>
        <Button color={(words.length === 25)?"green":"white"} onPress={()=>{setType("Game")}}>
          <Text style={styles.text}>Upload Game Board</Text>
        </Button>
      </Block>
      <Block center>
        <Button color={(colors.length === 25)?"green":"white"}  onPress={()=>{setType("Color")}}>
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
  containerBox: {
    flex:1,
    opacity: .6,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
