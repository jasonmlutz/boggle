import React from "react";

import { dictionary } from "./resources/OWL2";

export default function Solution({ cubes }) {
  // cubes is an array with entries of the form
  // {col: 1, index: 0, letter: "C", row: 1}

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function buildBoggleWords(length) {
    // base case
    if (length === 1) {
      const lengthOneWords = cubes.map((cube) => {
        var letter = cube.letter;
        return { word: letter, data: [cube] };
      });
      // so a typical entry of lengthOneWords looks like
      // { word: "C", data: [{col: 1, index: 0, letter: "C", row: 1}] }a
      // return an object with key 1 and value the array of length 1 words
      return { 1: lengthOneWords };
    } else {
      // build words of size at most length - 1
      // an object with format
      // var test = {1: lengthOneWords,
      // 2: lengthTwoWords};
      var smallerWords = buildBoggleWords(length - 1);
      // loop over the longest words in that object,
      // we'll add letters to them to get size length
      smallerWords[length] = [];
      smallerWords[length - 1].forEach((element) => {
        // identify the last letter
        var lastLetterData = element.data.at(-1);
        // loop over all the cubes
        cubes.forEach((cube) => {
          // calculate the distance between the cube and the lastLetter
          const distToLastLetter = calculateDistance(lastLetterData, cube);
          // calculate the distance between the cube and each other letter
          // first identify the data for the non-terminal letters
          const nonTerminalLetterData = element.data.slice(0, -1);
          // build an array of distances cube <-> letter
          const distancesToOtherLetters = nonTerminalLetterData.map(letterData => (
            calculateDistance(letterData, cube)
          ))
          // take the minimum of that array; it will be positive unless
          // the cube is a non-terminal letter
          const minDistToOtherLetters = Math.min(...distancesToOtherLetters)
          if (distToLastLetter === 1 && minDistToOtherLetters > 0) {
            // the cube isn't the lastLetterData and is adjacent to the lastLetterData
            const newWord = element.word + cube.letter;
            const newData = element.data.concat(cube);
            smallerWords[length].push({ word: newWord, data: newData });
          }
        });
      });
    }
    return smallerWords;
  }

  function test() {
    console.log(buildBoggleWords(3));
  }

  return <button onClick={test}>CLICK ME</button>;
}
