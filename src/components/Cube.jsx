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
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function handleLetterClick() {
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
      // check whether the clicked cube is among those already clicked
      const usedCubesIndexes = currentWord.map(
        (letterData) => letterData.index
      );
      if (usedCubesIndexes.includes(index)) {
        console.log("cube already used");
      } else {
        // check whether the cube is adjacent to the last cube in the current word
        const lastValidLetter = currentWord[currentWord.length - 1];
        if (calculateDistance(newLetterData, lastValidLetter) < 2) {
          setCurrentWord([...currentWord, newLetterData]);
        } else {
          console.log("cube must be adjacent to previously selected cube");
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
