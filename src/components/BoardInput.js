import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";

export default function BoardInput() {
  const [redWords, setRedWords] = useState("");
  const [blueWords, setBlueWords] = useState("");
  const [tanWords, setTanWords] = useState("");
  const [blackWords, setBlackWords] = useState("");

  return (
    <SafeAreaView>
      {_.zip([redWords, blueWords, tanWords, blackWords], [setRedWords, setBlueWords, setTanWords, setBlackWords], ["red", "blue", "neutral", "assassin"]).map((text, onChange, type) => (
        <TextInput
          value={text}
          onChangeText={onChange}
          placeholder={`Enter ${type} words, one per line`}
          key={type}
        />
      ))}
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
})
