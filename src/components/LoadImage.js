import React from "react";
import { Pressable, StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Dimensions } from "react-native";
import Modal from 'react-native-modal';
import Progress from 'react-native-progress';

export default function LoadImage({ modalText, setModalText, isLoading }) {
  return (
    <Modal
      animationType="none"
      isVisible={modalText !== "" || isLoading}
      flex={1}
    >
      <View>
        {isLoading?(
          <View style={styles.centeredView}>
            <Progress.Bar indeterminate={true} animationType={"timing"} color={"white"} indeterminateAnimationDuration={30000} width={200} />
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Not enough {modalText} detected. Please use a different photo.</Text>
              <Pressable style={styles.modalButton} onPress={() => setModalText("")}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -200
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
});