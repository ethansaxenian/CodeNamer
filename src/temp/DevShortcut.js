/*

Since I can't use the image picker, I've created this temporary component to allow me to generate a board state of my choosing.

- Ethan

*/

import { Block, Button } from "galio-framework";
import React from "react";
import _ from "lodash";

export default function DevShortcut({ setWords, setColors }) {

  const board = {
    actor: "tan",
    ball: "blue",
    cat: "red",
    dance: "red",
    dog: "blue",
    duck: "red",
    fish: "black",
    helicopter: "red",
    kangaroo: "red",
    knife: "tan",
    leaf: "blue",
    lemon: "tan",
    midnight: "red",
    nut: "tan",
    orange: "blue",
    platypus: "blue",
    plot: "red",
    school: "tan",
    scientist: "blue",
    sea: "tan",
    sky: "blue",
    slip: "blue",
    snow: "red",
    star: "tan",
    whale: "red",
  }

  const createMockBoard = () => {
    setWords(_.keys(board));
    setColors(_.values(board));
  }

  return (
    <Block center>
      <Button onPress={createMockBoard}>Generate Mock Board</Button>
    </Block>
  )
}
