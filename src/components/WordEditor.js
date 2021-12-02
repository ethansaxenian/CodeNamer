import React, { useState } from "react";
import Modal from 'react-native-modal';
import { Text, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import _ from "lodash";


export default function WordEditor({ wordToEdit, setWordToEdit, editWord }) {
  const [word, setWord] = useState(wordToEdit.word);
  const [color, setColor] = useState(wordToEdit.color);

  const submit = () => {
    editWord(wordToEdit.id, _.toLower(_.trim(word)), color);
    setWordToEdit();
  }

  return (
    <Modal flex={1} isVisible={wordToEdit}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Word:</Text>
          <Text>
            Word:
            <TextInput
              style={styles.input}
              value={word}
              onChangeText={setWord}
              placeholder={wordToEdit.word}
            />
          </Text>
          <Text>
            Color:
            <Picker
              style={styles.input}
              selectedValue={color}
              onValueChange={(itemValue) => setColor(itemValue)}
            >
              <Picker.Item label="Red" value="red"/>
              <Picker.Item label="Blue" value="blue"/>
              <Picker.Item label="Tan" value="tan"/>
              <Picker.Item label="Black" value="black"/>
            </Picker>
          </Text>
          <View style={styles.buttonGroup}>
            <Pressable style={styles.submitButton} onPress={() => submit()}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setWordToEdit()}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
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
  submitButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "red"
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
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
