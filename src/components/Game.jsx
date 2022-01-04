import React, { createContext, useEffect, useState } from "react";
import Board from "./Board";
import ButtonContainer from "./ButtonContainer";
import WordList from "./WordList";

import { WordHoverProvider } from "./contexts/wordHoverContext";

export const CurrentCubeContext = createContext();
export const CurrentWordContext = createContext();

export default function Game() {
  const [currentCube, setCurrentCube] = useState({ index: -1 });
  const [currentWord, setCurrentWord] = useState([]);
  const [wordList, setWordList] = useState({});

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function readableCurrentWord() {
    const readable = currentWord.map((letterData) => letterData.letter);
    return readable.join("");
  }

  function cubeIndexesCurrentWord() {
    const indexes = currentWord.map((letterData) => letterData.index);
    return indexes;
  }

  useEffect(() => {
    // if currentCube has more than just {index: -1}
    if (currentCube.letter) {
      // if there is not a curentWord, we may add freely
      if (currentWord.length === 0) {
        setCurrentWord([currentCube]);
      } else {
        // check to see whether the currentCube corresponds to the
        // last letter in the currentWord
        if (currentWord.at(-1).index === currentCube.index) {
          currentWord.pop();
        } else {
          // build an array of the indexes of letters in current word
          var usedCubesIndexes = currentWord.map(
            (letterData) => letterData.index
          );
          // check whether the clicked cube is among those already clicked
          if (usedCubesIndexes.includes(currentCube.index)) {
            console.log("cube already used");
          } else {
            // check whether the cube is adjacent to the last cube in the current word
            const lastValidLetter = currentWord[currentWord.length - 1];
            if (calculateDistance(currentCube, lastValidLetter) < 2) {
              setCurrentWord([...currentWord, currentCube]);
            } else {
              console.log("cube must be adjacent to previously selected cube");
            }
          }
        }
      }
    }
    setCurrentCube({ index: -1 });
  }, [currentCube.index]);

  function handleClearWord() {
    setCurrentWord([]);
    setCurrentCube({ index: -1 });
  }

  function handleSubmitWord() {
    console.log("word submitted");
    if (currentWord.length < 1) {
      console.log("can't submit blank word");
    } else {
      if (Object.keys(wordList).includes(readableCurrentWord())) {
        console.log("word already entered");
        handleClearWord();
      } else {
        setWordList((prevState) => {
          const newWord = {[readableCurrentWord()]: cubeIndexesCurrentWord()}
          return {...prevState, ...newWord};
        });
        handleClearWord();
      }
    }
  }

  return (
    <div className="Game Game-portrait">
      <CurrentCubeContext.Provider value={{ setCurrentCube }}>
        <WordHoverProvider>
          <CurrentWordContext.Provider value={{ currentWord }}>
            <Board />
          </CurrentWordContext.Provider>
          <div className="Interface Interface-portrait">
            <ButtonContainer
              readableCurrentWord={readableCurrentWord(currentWord)}
              handleClearWord={handleClearWord}
              handleSubmitWord={handleSubmitWord}
            />
            <WordList wordList={wordList} />
          </div>
        </WordHoverProvider>
      </CurrentCubeContext.Provider>
    </div>
  );
}
