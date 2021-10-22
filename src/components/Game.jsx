import React from "react";
import Board from "./Board";
// import ButtonContainer from "./ButtonContainer"
// import WordList from "./WordList";

import {CurrentWordProvider} from "./contexts/currentWordContext";

export default function Game() {
  return (
    <CurrentWordProvider>
      <div className="Game Game-portrait">
        <Board />
        <div className="Interface Interface-portrait"></div>
      </div>
    </CurrentWordProvider>
  );
}
