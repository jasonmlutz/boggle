import React, { useState, useContext } from "react";

import { CurrentWordContext } from "./contexts/currentWordContext";

export default function Cube({ letters, row, col }) {
  const [letter] = useState(() => {
    const splitLetters = letters.split(" ");
    const initialLetter =
      splitLetters[Math.floor(Math.random() * splitLetters.length)];

    return initialLetter;
  });

  const {currentWord, setCurrentWord} = useContext(CurrentWordContext);

  function handleLetterClick() {
    const newLetterData = {
      letter: letter,
      row: row,
      col: col
    }
    setCurrentWord([...currentWord, newLetterData]);
  }

  return (
    <div className="Cube" onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
