import React, { useContext } from "react";
import { CurrentWordContext } from "./contexts/currentWordContext";
import { WordListContext } from "./contexts/wordListContext";

export default function ButtonContainer() {
  const { currentWord, setCurrentWord } = useContext(CurrentWordContext);
  const { setWordList } = useContext(WordListContext);

  function parseCurrentWord() {
    const currentWordReadable = currentWord.map(letterData => (
      letterData.letter
    ));
    return currentWordReadable
  }

  function handleClearWord() {
    setCurrentWord([]);
  }

  function handleSubmitWord() {
    setWordList((prevState) => {
      return [...prevState, ...[parseCurrentWord()]];
    });
    handleClearWord();
  }


  return (
    <div className="ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <p>{parseCurrentWord()}</p>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
