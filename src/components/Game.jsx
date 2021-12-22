import React, { createContext, useEffect, useState } from "react";
import Board from "./Board";
import ButtonContainer from "./ButtonContainer";
import WordList from "./WordList";

export const CurrentCubeContext = createContext();
export const SelectedCubesContext = createContext();

export default function Game() {
  const [currentCube, setCurrentCube] = useState({ index: -1 });
  const [currentWord, setCurrentWord] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [selectedCubes, setSelectedCubes] = useState([]);

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function parseCurrentWord() {
    const currentWordReadable = currentWord.map(
      (letterData) => letterData.letter
    );
    return currentWordReadable.join("");
  }

  useEffect(() => {
    if (currentCube.letter) {
      // if this is the first cube clicked, we may add freely without any checks
      if (currentWord.length === 0) {
        setCurrentWord([currentCube]);
      } else {
        // check whether the clicked cube is among those already clicked
        const usedCubesIndexes = currentWord.map(
          (letterData) => letterData.index
        );
        if (usedCubesIndexes.includes(currentCube.index)) {
          console.log("cube already used");
        } else {
          // check whether the cube is adjacent to the last cube in the current word
          const lastValidLetter = currentWord[currentWord.length - 1];
          if (calculateDistance(currentCube, lastValidLetter) < 2) {
            setCurrentWord([...currentWord, currentCube]);
            setSelectedCubes(usedCubesIndexes);
          } else {
            console.log("cube must be adjacent to previously selected cube");
          }
        }
      }
    }
  }, [currentCube]);

  function handleClearWord() {
    setCurrentWord([]);
    setSelectedCubes([]);
    setCurrentCube({ index: -1 });
  }

  function handleSubmitWord() {
    console.log("word submitted");
    if (currentWord.length < 1) {
      console.log("can't submit blank word");
    } else {
      if (wordList.includes(parseCurrentWord())) {
        console.log("word already entered");
        handleClearWord();
      } else {
        setWordList((prevState) => {
          return [...prevState, ...[parseCurrentWord()]];
        });
        handleClearWord();
      }
    }
  }

  return (
    <div className="Game Game-portrait">
      <CurrentCubeContext.Provider value={{ currentCube, setCurrentCube }}>
        <SelectedCubesContext.Provider value={{ selectedCubes }}>
          <Board />
        </SelectedCubesContext.Provider>
        <div className="Interface Interface-portrait">
          <ButtonContainer
            readableCurrentWord={parseCurrentWord(currentWord)}
            handleClearWord={handleClearWord}
            handleSubmitWord={handleSubmitWord}
          />
          <WordList wordList={wordList} />
        </div>
      </CurrentCubeContext.Provider>
    </div>
  );
}
