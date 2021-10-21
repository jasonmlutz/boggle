import React, { useState } from "react";
import { useSingleton } from "./resources/singleton";

import Cube from "./Cube";
import { cubeLetters } from "./resources/cubeLetters";

export default function Board() {
  // try using https://reactjs.org/docs/hooks-reference.html#lazy-initial-state instead
  const [cubeOrder, setCubeOrder] = useState(() => {
    // source: https://stackoverflow.com/a/2450976/10067393
    let currentIndex = cubeLetters.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
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
  const orderedCubes = cubeOrder.map((letters, index) => (
    <li>
      <Cube key={index} letters={letters} />
    </li>
  ));

  return (
    <ol className = "Board">{orderedCubes}</ol>
  )
}
