import { grey } from '@mui/material/colors';
import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, Pressable} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const { width } = Dimensions.get('screen');

export default function GameBoard({ board, view, toggleWord }) {
  const images = {
    red: {
      uri: require("../../assets/red.png")
    },
    blue: {
      uri: require("../../assets/blue.png")
    },
    tan: {
      uri: require("../../assets/tan.png")
    },
    black: {
      uri: require("../../assets/black.png")
    }
  }


  return (
    <FlatGrid
      itemDimension={width/6}
      data={board}
      renderItem={({ item }) => (
        <View>
          {item.active ? (
            <Pressable
              style={[styles.itemContainer, { backgroundColor:view ? "tan" : (item.color)}]}
              onPress={() => toggleWord(item.word)}
            >
              <Text style={styles.itemName} adjustsFontSizeToFit numberOfLines={1}>{item.word}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.imageContainer} onPress={() => toggleWord(item.word)}>
              <Image resizeMode={"cover"} style= {styles.spyImage} source={images[item.color].uri}/>
            </Pressable>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    width: width/6,
    height: 38,
    justifyContent: "center",
    alignItems: "center"
  },
  itemName: {
    color: '#fff',
    fontWeight: '600',
    textAlignVertical: 'center',
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: grey,
    width: width/6,
    height: 38,
    justifyContent: "center",
    alignItems: "center"
  },
  spyImage: {
      flex: 1,
      borderRadius: 5,
      alignSelf: 'stretch',
      width: width/6,
      height: 38,
  },
});
