import React, { useEffect, useState } from "react";
import { Button, Block } from "galio-framework";
import { Text, View, StyleSheet } from "react-native";
import PickImage from "./PickImage";
import _ from "lodash";
import LoadImage from "./LoadImage";
import DevShortcut from "../temp/DevShortcut";
import { API_SERVER_URL, fetchWithTimeout } from "../lib/utils";

export default function ImageInputs({ setBoard }) {
  const [colors, setColors] = useState([]);
  const [words, setWords] = useState([]);
  const [modalText, setModalText] = useState("");
  const [imageType, setType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((colors.length > 0) && (words.length > 0)) {
      // the board is represented as a list of objects
      const newBoard = _.zip(words, colors).map(([ word, color ], id) => (
        {
          word,
          ogWord: word,
          color,
          ogColor: color,
          active: true,
          id
        }
      ));
      setBoard(newBoard);
    }
  }, [colors, words]);

  const readGameBoardImage = async (imgEncoding) => {
    setWords([]);
    setLoading(true);
    try {
      const response = await fetchWithTimeout(`${API_SERVER_URL}/gameboard`, {
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

    } catch (error) {
      if (error.name === "AbortError") {
        setModalText("words");
      }
    }

    setLoading(false);
  };

  const readColorCodeImage = async (imgEncoding) => {
    setColors([]);
    setLoading(true);
    try {
      const response = await fetchWithTimeout(`${API_SERVER_URL}/colors`, {
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

    } catch (error) {
      if (error.name === "AbortError") {
        setModalText("colors");
      }
    }

    setLoading(false);
  };


  return (
    <View flex={1} paddingTop={100} height={'100%'} width={'100%'}>
      {(modalText !== "" || loading) && (
        <LoadImage modalText={modalText} setModalText={setModalText} isLoading={loading} flex={1}/>
      )}
      {/* <DevShortcut setColors={setColors} setWords={setWords}/> */}
      <Block center>
        <Button color={(words.length === 25) ? "green" : "white"} onPress={() => setType("Game")}>
          <Text style={styles.text}>Upload Game Board Image</Text>
        </Button>
      </Block>
      <Block center>
        <Button color={(colors.length === 25) ? "green" : "white"} onPress={() => setType("Color")}>
          <Text style={styles.text}>Upload Color Card Image</Text>
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
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  }
});
