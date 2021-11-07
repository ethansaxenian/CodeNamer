import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const { width } = Dimensions.get('screen');

export default function GameBoard({ board }) {
  return (
    <FlatGrid
      itemDimension={width/6}
      data={board}
      style={styles.gridView}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
          <Text style={styles.itemName} adjustsFontSizeToFit numberOfLines={1}>{item.word}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    width: width/6,
    justifyContent: "center",
    alignItems: "center"
  },
  itemName: {
    color: '#fff',
    fontWeight: '600',
    textAlignVertical: 'center',
    textAlign: "center",
  },
});
