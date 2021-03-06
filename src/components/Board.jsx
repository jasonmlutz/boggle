import React, { useState } from "react";

import Cube from "./Cube";
import Solution from "./Solution";
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
  // to be run only on the first render
  const [orderedCubesArray] = useState(() => {
    var orderedCubes = [];
    var row = 1;
    var col = 1;
    cubeOrder.forEach((letters, index) => {
      // select a letter at random from the letters
      var splitLetters = letters.split(" ");
      var letter =
        splitLetters[Math.floor(Math.random() * splitLetters.length)];

      // create a new cube using the current letters and coords
      var newCube = { letter: letter, row: row, col: col, index: index };
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

    return orderedCubes;
  });

  const [orderedCubesListItems] = useState(() => {
    var orderedCubes = [];
    orderedCubesArray.forEach((cube) => {
      var newCube = (
        <li className="Cube-container" key={cube.index}>
          <Cube
            letter={cube.letter}
            row={cube.row}
            col={cube.col}
            index={cube.index}
          />
        </li>
      );
      // add the new cube to the orderedCubes array
      orderedCubes.push(newCube);
    });

    return orderedCubes;
  });

  return (
    <div className = "BoardContainer">
      <ul className="Board">{orderedCubesListItems}</ul>
      <Solution cubes={orderedCubesArray} />
    </div>
  );
}
