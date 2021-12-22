import React from "react";

export default function ButtonContainer({
  readableCurrentWord,
  setCurrentWord,
  setSelectedCubes,
  setCurrentCube,
  handleSubmitWord
}) {
  function handleClearWord() {
    setCurrentWord([]);
    setSelectedCubes([]);
    setCurrentCube({index: -1});
  }

  return (
    <div className="ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <div className="CurrentWordContainer">
        <p>{readableCurrentWord}</p>
      </div>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
