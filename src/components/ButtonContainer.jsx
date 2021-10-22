import React, {useContext} from "react";
import { CurrentWordContext } from "./contexts/currentWordContext";

export default function ButtonContainer() {
  const {currentWord, setCurrentWord} = useContext(CurrentWordContext);

  function handleClearWord() {
    setCurrentWord("");
  }

  function handleSubmitWord() {
    console.log("current word is", currentWord);
    handleClearWord();
  }
  return (
    <div className = "ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <p>{currentWord}</p>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
