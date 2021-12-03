import React from "react";
import Modal from 'react-native-modal';
import { Text, Pressable, StyleSheet, FlatList, View } from 'react-native';

export default function InvalidWordsModal({ words, setVisible }) {
  const data = words.map((word) => ({key: word}));

  return (
    <Modal flex={1} isVisible={words.length > 0}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cannot generate board due to the following invalid words:</Text>
            <FlatList
              data={data}
              renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
          <Pressable style={styles.modalButton} onPress={() => setVisible(false)}>
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop:-100,
      height: 275
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalButton: {
      marginTop: 25,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "#2196F3"
    },
    modalButtonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "red"
    },
    item: {
        fontSize: 12,
      },
  });
