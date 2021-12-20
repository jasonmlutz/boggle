import React, { createContext, useState } from "react";
import Board from "./Board";
import ButtonContainer from "./ButtonContainer";
import WordList from "./WordList";

import { CurrentWordProvider } from "./contexts/currentWordContext";
import { CurrentCubeProvider } from "./contexts/currentCubeContext";

export const WordListContext = createContext();

export default function Game() {
  const [wordList, setWordList] = useState([]);

  return (
    <CurrentCubeProvider>
      <CurrentWordProvider>
        <div className="Game Game-portrait">
          <Board />
          <div className="Interface Interface-portrait">
            <WordListContext.Provider value = {{ wordList, setWordList }}>
              <ButtonContainer />
            </WordListContext.Provider>
            <WordList wordList={wordList} />
          </div>
        </div>
      </CurrentWordProvider>
    </CurrentCubeProvider>
  );
}
