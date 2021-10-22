import React, { useContext } from "react";
import { CurrentWordContext } from "./contexts/currentWordContext";
import { WordListContext } from "./contexts/wordListContext";

export default function ButtonContainer() {
  const { currentWord, setCurrentWord } = useContext(CurrentWordContext);
  const { setWordList } = useContext(WordListContext);

  function handleClearWord() {
    setCurrentWord("");
  }

  function handleSubmitWord() {
    // setWordList(wordList.push(currentWord));
    setWordList((prevState) => {
      return [...prevState, ...[currentWord]];
    });
    handleClearWord();
  }
  return (
    <div className="ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <p>{currentWord}</p>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
