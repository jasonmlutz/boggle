import React, { useContext } from "react";

import { CurrentCubeContext } from "./Game";
import { SelectedCubesContext } from "./Game";

export default function Cube({ letter, row, col, index }) {
  const { setCurrentCube } = useContext(CurrentCubeContext);
  const { selectedCubes } = useContext(SelectedCubesContext);

  function handleLetterClick() {
    const newCurrentCube = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };

    setCurrentCube(newCurrentCube);
  }

  let className = "Cube";
  if (selectedCubes[selectedCubes.length - 1] === index) {
    className += " CubeCurrent";
  } else {
    if (selectedCubes.includes(index)) {
      className += " CubeSelected";
    }
  }

  return (
    <div className={className} onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
