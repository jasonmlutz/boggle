import React, { useState, useContext } from "react";

import { CurrentWordContext } from "./contexts/currentWordContext";

export default function Cube({ letters, row, col, index }) {
  const [letter] = useState(() => {
    const splitLetters = letters.split(" ");
    const initialLetter =
      splitLetters[Math.floor(Math.random() * splitLetters.length)];

    return initialLetter;
  });

  const { currentWord, setCurrentWord } = useContext(CurrentWordContext);

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col)
    const rowDiff = Math.abs(cube1.row - cube2.row)
    return Math.max(colDiff, rowDiff)
  }

  function handleLetterClick() {
    // begin by building the new letter object
    const newLetterData = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };
    // if this is the first cube clicked, we may add freely without any checks
    if (currentWord.length === 0) {
      setCurrentWord([newLetterData]);
    } else {
      // if the current word is not empty,
      // we need to first check whether this cube has already been used
      //
      // generate an array of the already-used cube indexes
      const usedCubesIndexes = currentWord.map(
        (letterData) => letterData.index
      );
      // check whether the clicked cube is among those already clicked
      if (usedCubesIndexes.includes(index)) {
        // if yes, display message
        console.log("cube already used");
      } else {
        // if the cube has not been used,
        // we need to check whether the cube is adjacent to the last
        // cube in the current word
        // 
        // find the last cube used
        const lastValidLetter = currentWord[currentWord.length - 1];
        // check whether its distance to the new cube is less than 2
        if (calculateDistance(newLetterData, lastValidLetter) < 2) {
          // if yes, we may add the cube to the current word
          setCurrentWord([...currentWord, newLetterData]);
        } else {
          // if not, display a message
          console.log("cube must be adjacent to previously selected cube")
        }
      }
    }
  }

  return (
    <div className="Cube" onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
