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

  function handleLetterClick() {
    // generate an array of the already-used cube indexes
    const usedCubesIndexes = currentWord.map((letterData) => 
      letterData.index
    );
    // check whether the clicked cube is among those already clicked
    if (usedCubesIndexes.includes(index)) {
      // if yes, display message
      console.log("cube already used");
    } else {
      // if not, pass the data to the currentWord context
      const newLetterData = {
        letter: letter,
        row: row,
        col: col,
        index: index,
      };
      setCurrentWord([...currentWord, newLetterData]);
    }
  }

  return (
    <div className="Cube" onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
