import React, { createContext, useState } from "react";
import Board from "./Board";
import ButtonContainer from "./ButtonContainer";
import WordList from "./WordList";

import { CurrentWordProvider } from "./contexts/currentWordContext";
// import { CurrentCubeProvider } from "./contexts/currentCubeContext";

export const WordListContext = createContext();
// export const CurrentWordContext = createContext();
export const CurrentCubeContext = createContext();

export default function Game() {
  const [wordList, setWordList] = useState([]);
  const [currentCube, setCurrentCube] = useState({});

  return (
    <CurrentWordProvider>
      <div className="Game Game-portrait">
        <CurrentCubeContext.Provider value = {{currentCube, setCurrentCube}}>
          <Board />
          <div className="Interface Interface-portrait">
            <WordListContext.Provider value={{ wordList, setWordList }}>
              <ButtonContainer />
            </WordListContext.Provider>
            <WordList wordList={wordList} />
          </div>
        </CurrentCubeContext.Provider>
      </div>
    </CurrentWordProvider>
  );
}
