import React, { useContext } from "react";

import { CurrentCubeContext } from "./Game";
import { SelectedCubesContext } from "./Game";

export default function Cube({
  letter,
  row,
  col,
  index,
}) {
  const { currentCube, setCurrentCube } = useContext(CurrentCubeContext);
  const { selectedCubes } = useContext(SelectedCubesContext);

  function handleLetterClick() {
    const newCurrentCube = {
      letter: letter,
      row: row,
      col: col,
      index: index,
    };

    if (currentCube.index === index) {
      setCurrentCube({ index: -1 });
    } else {
      setCurrentCube(newCurrentCube);
    }
  }

  let className = "Cube";
  if (selectedCubes.includes(index)) {
    className += " CubeSelected"
  }
  if (currentCube.index === index) {
    className += " CubeCurrent"
  }

  return (
    <div className={className} onClick={handleLetterClick}>
      <p>{letter}</p>
    </div>
  );
}
