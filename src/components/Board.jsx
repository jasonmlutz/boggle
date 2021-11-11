import React, { useState } from "react";

import Cube from "./Cube";
import { cubeLetters } from "./resources/cubeLetters";

export default function Board() {
  // try using https://reactjs.org/docs/hooks-reference.html#lazy-initial-state instead
  const [cubeOrder] = useState(() => {
    // source: https://stackoverflow.com/a/2450976/10067393
    let currentIndex = cubeLetters.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [cubeLetters[currentIndex], cubeLetters[randomIndex]] = [
        cubeLetters[randomIndex],
        cubeLetters[currentIndex],
      ];
    }

    return cubeLetters;
  });

  // build a ul of Cube components from the cubeLetters
  var orderedCubes = [];
  var row = 1;
  var col = 1;
  cubeOrder.forEach((letters, index) => {
    // create a new cube using the current letters and coords
    var newCube = (
      <li className="Cube-container" key={index}>
        <Cube letters={letters} row={row} col={col} />
      </li>
    );
    // add the new cube to the orderedCubes array
    orderedCubes.push(newCube);
    // increment the column
    col++;
    if (col > 4) {
      // in the case that we are on column 5, reset column and increment row
      col = 1;
      row++;
    }
  });

  return <ul className="Board">{orderedCubes}</ul>;
}
