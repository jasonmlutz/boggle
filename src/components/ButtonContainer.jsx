import React from "react";

export default function ButtonContainer({
  readableCurrentWord,
  handleClearWord,
  handleSubmitWord
}) {

  var classname = ""
  if (readableCurrentWord.length === 0) {
    classname += "empty"
  }

  return (
    <div className="ButtonContainer">
      <button onClick={handleClearWord}>CLEAR</button>
      <div className="CurrentWordContainer">
        <p className = {classname}>{readableCurrentWord}</p>
      </div>
      <button onClick={handleSubmitWord}>SUBMIT</button>
    </div>
  );
}
