import React, { useContext } from "react";

import { CurrentCubeContext } from "./Game";

export default function Cube({ letter, row, col, index }) {
  const { currentCube, setCurrentCube } = useContext(CurrentCubeContext);

  function handleLetterClick() {
    const newCurrentCube = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };

    if (currentCube.index === index) {
      setCurrentCube({});
    } else {
      setCurrentCube(newCurrentCube);
    }
  }

  return (
    <div className="Cube" onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
