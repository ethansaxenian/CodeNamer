import React, { useState } from "react";
import Modal from 'react-native-modal';
import { StyleSheet, View, Pressable, TextInput, Block } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import _ from "lodash";
import { Text } from "galio-framework";


export default function WordEditor({ wordToEdit, setWordToEdit, editWord }) {
  const [word, setWord] = useState(wordToEdit.word);
  const [color, setColor] = useState(wordToEdit.color);

  const submit = () => {
    editWord(wordToEdit.id, _.toLower(_.trim(word)), color);
    setWordToEdit();
  }

  return (
    <Modal flex={1} isVisible={!!wordToEdit}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text h4 style={styles.modalText}>Edit Word:</Text>
          <Text h6 style={{padding:10}}>
            Word:
          </Text>
          <TextInput
              style={styles.textInput}
              value={word}
              onChangeText={setWord}
              placeholder={wordToEdit.word}
            />
          <Text h6 style={{paddingTop:90, paddingLeft:15}}>
            Color:   
          </Text>
          <Picker
              style={styles.colorInput, {width: 170}}
              selectedValue={color}
              onValueChange={(itemValue) => setColor(itemValue)}
            >
              <Picker.Item label="Red" value="red"/>
              <Picker.Item label="Blue" value="blue"/>
              <Picker.Item label="Tan" value="tan"/>
              <Picker.Item label="Black" value="black"/>
            </Picker>
          
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
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    paddingRight: 40,
    paddingLeft: 40,
    padding: 25,
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent:"center",
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
    backgroundColor: "#2196F3",
    margin: 10
  },
  closeButton: {
    borderRadius: 20,
    width:100,
    padding: 10,
    elevation: 2,
    backgroundColor: "red",
    margin: 10
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    paddingBottom:25,
    marginRight:50,
    marginLeft:50,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonGroup: {
    marginTop:0,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  textInput: {
    width: 150,
    maxHeight:50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  colorInput: {
    marginTop: -20,
    paddingTop:-80,
    marginRight:-10,
  },
});
