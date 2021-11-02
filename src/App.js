import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Dimensions} from 'react-native';
import { Button, Text, Block } from 'galio-framework';
import _ from 'lodash';

import Images from './ImagePicker';
import GameBoard from './GameBoard';

const { width } = Dimensions.get('screen');

export default function App() {
  const [clue, setClue] = useState();
  const[colors, setColors] = useState(null);
  const[game, setGame] = useState(null);
  const[board, setBoard] = useState();
  const[clueRequest, setReq] = useState("");
  const[clueNum, incClueNum] = useState(0);

  useEffect(() => {
    const createBoard = () =>{
      let board = [];
      let redList = "red=";
      let blueList = "&blue=";
      let tanList = "&tan=";
      let blackList = "&black=";

      colors.forEach((obj, index) =>{
        if(obj == "red"){
           board.push([game[index], "red"]);
           redList+=(String(game[index])+"+");
          }
        else if(obj == "blue"){
          board.push([game[index], "blue"]);
          blueList+=(String(game[index])+"+");
          }
        else if(obj == "tan"){
          board.push([game[index], "tan"]);
          tanList+=(String(game[index])+"+");
        }
        else if(obj == "black"){
          board.push([game[index], "black"]);
          blackList+=String(game[index]);
        }
      })
      
      setBoard(board);
      setReq(redList.slice(0, redList.length-1)+blueList.slice(0, blueList.length-1)+tanList.slice(0, tanList.length-1)+blackList);
    }
    if(colors && game){
      createBoard();
    }
      
    } , [game]);


  const getHint = async(type) =>{
    const response =  await fetch(`http://127.0.0.1:5000/clues/${type}?${clueRequest}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newClue = await response.json();
    setClue(newClue[clueNum]);
    incClueNum(clueNum+1);
    return clue;
  };

  

  const getColorCode = async(imgEncoding) => {
    const response =  await fetch(`http://127.0.0.1:5000/colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchedColors = await response.json();
    setColors(fetchedColors);
    return fetchedColors
  };

  const getGameBoard = async(imgEncoding) => {
    const response =  await fetch(`http://127.0.0.1:5000/gameboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgEncoding
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchedGame = await response.json();
    setGame(fetchedGame);
    return fetchedGame
  };



  if(board){
    return(
    <View style = {styles.container}>
      <Block center = {true}>
        <Text h3>CodeNamer</Text>
      </Block>
      <View flex={2} marginTop={50} > 
        <GameBoard board = {board}/>
      </View>
      <View flex = {2}  >
        <Block center = {true} >
          <Button color="info" onPress={() => getHint("blue")} disabled={!(game && colors)}>Get Blue Hint</Button>
          <Button onPress={() => getHint("red")} disabled={!(game && colors)}>Get Red Hint</Button>
          {clue?<View marginTop={50}>
          <Text h6>Cards: {clue["cards"].map(function(card, index){ return card.charAt(0).toUpperCase() + card.slice(1)+", "})}</Text>
          <Text h6>Hint: {clue["word"].charAt(0).toUpperCase() + clue["word"].slice(1)}</Text></View>: null}
        </Block>
      </View>
      
    </View>);
  }
  else{
  return (
    <View style = {styles.container}>
      <Block center = {true}>
        <Text h3>CodeNamer</Text>
      </Block>
      <View flex={1} paddingTop = {50}>
        <Block center={true}>
        <Text h5>Upload Color Card:</Text>
        <Images getImage = {getColorCode}/>
        </Block>
        <Block center={true}>
        <Text h5>Upload Game Board:</Text>
        <Images getImage = {getGameBoard}/>
        </Block>
      </View>
    </View>
  );
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },

});