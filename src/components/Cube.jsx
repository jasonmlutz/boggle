import React, { useContext } from "react";

import { CurrentCubeContext } from "./Game";

import { CurrentWordContext } from "./contexts/currentWordContext";

export default function Cube({ letter, row, col, index }) {
  const { currentWord, setCurrentWord } = useContext(CurrentWordContext);
  const { currentCube, setCurrentCube } = useContext(CurrentCubeContext);

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function handleLetterClick() {
    const newCurrentCube = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };
    
    if (currentCube.index === index) {
      setCurrentCube({});
    } else {
      setCurrentCube(newCurrentCube);
    }

    // if this is the first cube clicked, we may add freely without any checks
    if (currentWord.length === 0) {
      setCurrentWord([newCurrentCube]);
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
        if (calculateDistance(newCurrentCube, lastValidLetter) < 2) {
          setCurrentWord([...currentWord, newCurrentCube]);
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
