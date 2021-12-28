import React, { useContext } from "react";

import { CurrentCubeContext } from "./Game";
import { CurrentWordContext } from "./Game";

export default function Cube({ letter, row, col, index }) {
  const { setCurrentCube } = useContext(CurrentCubeContext);
  const { currentWord } = useContext(CurrentWordContext);

  function handleLetterClick() {
    const newCurrentCube = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };

    setCurrentCube(newCurrentCube);
  }

  const selectedCubes = currentWord.map(
    letterData => letterData.index
  )

  let className = "Cube";
  if (selectedCubes.at(-1) === index) {
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
