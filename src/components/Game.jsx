import React from "react";
import Board from "./Board";
import ButtonContainer from "./ButtonContainer";
import WordList from "./WordList";

import { CurrentWordProvider } from "./contexts/currentWordContext";
import { CurrentCubeProvider } from "./contexts/currentCubeContext";
import { WordListProvider } from "./contexts/wordListContext";

export default function Game() {
  return (
    <CurrentCubeProvider>
      <CurrentWordProvider>
        <div className="Game Game-portrait">
          <Board />
          <WordListProvider>
            <div className="Interface Interface-portrait">
              <ButtonContainer/>
              <WordList/>
            </div>
          </WordListProvider>
        </div>
      </CurrentWordProvider>
    </CurrentCubeProvider>
  );
}
