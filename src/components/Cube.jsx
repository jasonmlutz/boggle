import React, { useState, useContext } from "react";

import { CurrentWordContext } from "./contexts/currentWordContext";

export default function Cube({ letters }) {
  const [letter] = useState(() => {
    const splitLetters = letters.split(" ");
    const initialLetter =
      splitLetters[Math.floor(Math.random() * splitLetters.length)];

    return initialLetter;
  });

  const {currentWord, setCurrentWord} = useContext(CurrentWordContext);

  function handleLetterClick() {
    setCurrentWord(currentWord + letter)
  }

  return (
    <div className="Cube" onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
