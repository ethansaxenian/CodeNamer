import React from "react";
import Modal from 'react-native-modal';
import { Text, Pressable, StyleSheet, FlatList, View } from 'react-native';

export default function ImageInfo({ info, showInfo }) {
  return (
    <Modal
      animationType="none"
      isVisible={info}
      flex={1}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Make sure your images: </Text>
                 <FlatList
                    data={[
                    {key: '- Are cropped to the border of the game board/color card.'},
                    {key: '- Are taken in good, consistent lighting (no flash).'},
                    {key: '- Have word cards spaced out evenly, with about an inch of buffer.'},
                    {key: '- Have a light background.'},

                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
                <Pressable style={styles.modalButton} onPress={() => showInfo(false)}>
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
