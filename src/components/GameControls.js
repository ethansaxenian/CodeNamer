import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import _ from "lodash";

export default function GameControls({ board, setBoard, spyView, setView}) {
    const resetBoard = () => {
        const newBoard = board.map((card) => {
            return {...card, active: true}
            }
        );
        setBoard(newBoard);
        }

  return (
    <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}> 
        <Button onPress={()=>{setView(!spyView)}} style={styles.spyButton}>
        <Image style={styles.spyButton} source={spyView?require("../../assets/icon.png"): require("../../assets/norm.png")}/>
        </Button>
        <Button onPress={()=>{resetBoard()}} style={styles.spyButton}>Reset</Button>
        <Button onPress={()=>{resetBoard()}} style={styles.spyButton}>Edit</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  spyButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 80,
    height: 40
  },
});
