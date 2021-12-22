import React from "react";

export default function ButtonContainer({
  readableCurrentWord,
  handleClearWord,
  handleSubmitWord
}) {

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
