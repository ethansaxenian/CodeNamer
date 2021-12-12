import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, Pressable} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import WordEditor from './WordEditor';

const { width, height } = Dimensions.get('screen');

export default function GameBoard({ board, view, toggleWord, editWord }) {
  const [wordToEdit, setWordToEdit] = useState();

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
    <>
      <FlatGrid
        itemDimension={width/6}
        data={board}
        listKey='boardkey'
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View>
            {item.active ? (
              <Pressable
                style={[styles.itemContainer, { backgroundColor:view ? "tan" : (item.color)}]}
                onPress={() => toggleWord(item.id)}
                onLongPress={() => setWordToEdit(item)}
              >
                <Text style={styles.itemName} adjustsFontSizeToFit numberOfLines={1}>{item.word}</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.imageContainer} onPress={() => toggleWord(item.id)}>
                <Image resizeMode={"cover"} style= {styles.spyImage} source={images[item.color].uri}/>
              </Pressable>
            )}
          </View>
        )}
      />
      {wordToEdit && <WordEditor wordToEdit={wordToEdit} setWordToEdit={setWordToEdit} editWord={editWord}/>}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    width: width/6,
    height: height/22.3,
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
    backgroundColor: "grey",
    width: width/6,
    height: height/22.2,
    justifyContent: "center",
    alignItems: "center"
  },
  spyImage: {
    flex: 1,
    borderRadius: 5,
    alignSelf: 'stretch',
    width: width/6,
    height: height/22.2,
  },
});
