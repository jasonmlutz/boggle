import React, { useContext } from "react";
import { CurrentWordContext } from "./contexts/currentWordContext";
import { WordListContext } from "./Game";

export default function ButtonContainer() {
  const { currentWord, setCurrentWord } = useContext(CurrentWordContext);
  const { wordList, setWordList } = useContext(WordListContext);

  function parseCurrentWord() {
    const currentWordReadable = currentWord.map(
      (letterData) => letterData.letter
    );
    return currentWordReadable.join("");
  }

  function handleClearWord() {
    setCurrentWord([]);
  }

  function handleSubmitWord() {
    if (currentWord.length < 1) {
      console.log("can't submit blank word");
    } else {
      if (wordList.includes(parseCurrentWord())) {
        console.log("word already entered");
        handleClearWord();
      } else {
        setWordList((prevState) => {
          return [...prevState, ...[parseCurrentWord()]];
        });
        handleClearWord();
      }
    }
  }

  return (
    <div className="ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <p>{parseCurrentWord()}</p>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
