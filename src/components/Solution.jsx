import React, { useState } from "react";

import { dictionary } from "./resources/OWL2";

export default function Solution({ cubes }) {
  // cubes is an array with entries of the form
  // {col: 1, index: 0, letter: "C", row: 1}
  const [sortedDictionary] = useState(() => {
    var sorted = {};
    for (let i = 2; i <= 12; i++) {
      sorted[i] = {};
    }

    for (const [word, definition] of Object.entries(dictionary)) {
      var length = word.length;
      sorted[length][word] = definition;
    }

    return sorted;
  });

  function calculateDistance(cube1, cube2) {
    const colDiff = Math.abs(cube1.col - cube2.col);
    const rowDiff = Math.abs(cube1.row - cube2.row);
    return Math.max(colDiff, rowDiff);
  }

  function buildBoggleWords(length) {
    // NOTES:
    // there are no 1-letter words in the dictionary
    // moreover, there are no words of length greater than 12
    //
    // for each letter in the alphabet, there is a valid word
    // which begins with that letter
    //
    // base case
    if (length === 1) {
      const baseWords = cubes.map((cube) => {
        var letter = cube.letter;
        return { word: letter, data: [cube] };
      });
      // so a typical entry of baseWords looks like
      // { word: "C", data: [{col: 1, index: 0, letter: "C", row: 1}] }
      // return an object with key 1 and value the array of length 1 words
      return { baseWords: baseWords, 1: [] };
    } else {
      // build words of size at most length - 1
      // an object with format
      // var test = {
      // baseWords: []
      // 1: lengthOneWords,
      // 2: lengthTwoWords}
      // ;
      var smallerWords = buildBoggleWords(length - 1);
      // loop over the baseWords in that object
      // we'll add letters to them
      // if that addition produces a valid word, add it to smallerWords.length
      smallerWords[length] = [];
      // if it produces a valid baseWord, add it to a newBaseWords list
      var newBaseWords = [];
      smallerWords.baseWords.forEach((element) => {
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
          const distancesToOtherLetters = nonTerminalLetterData.map(
            (letterData) => calculateDistance(letterData, cube)
          );
          // take the minimum of that array; it will be positive unless
          // the cube is a non-terminal letter
          const minDistToOtherLetters = Math.min(...distancesToOtherLetters);
          if (distToLastLetter === 1 && minDistToOtherLetters > 0) {
            // the cube isn't the lastLetterData and is adjacent to the lastLetterData
            // moreover it isn't an already used cube, so it is a valid Boggle word
            const newWord = element.word + cube.letter;
            const newLength = newWord.length;
            const newData = element.data.concat(cube);
            // if it is a valid dictionary word, add it
            var definition = dictionary[newWord.toLowerCase()];
            if (definition !== undefined) {
              smallerWords[length].push({ word: newWord, data: newData });
            }
            // now we check whether there is at least one word that starts with that base word:
            // loop over lengths of words starting with newLength + 1
            for (let i = newLength + 1; i <= 12; i++) {
              Object.keys(sortedDictionary[i]).every((word) => {
                if (newWord.toLowerCase() === word.slice(0, newLength)) {
                  newBaseWords.push({ word: newWord, data: newData });
                  i = 13;
                  return false;
                }
                return true;
              });
            }
          }
        });
      });
    }
    smallerWords.baseWords = newBaseWords;
    return smallerWords;
  }

  function test() {
    // console.log(boggleWords)
    // console.log(sortedDictionary);

    const length = 12;
    console.log(`starting buildBoggleWords, length ${length}`);
    const t0 = performance.now();
    console.log(buildBoggleWords(length));
    const t1 = performance.now();
    console.log(`buildBoggleWords took ${t1 - t0} milliseconds.`);

    // var startingLetters = []
    // for (const [key, value] of Object.entries(dictionary)) {
    //   var firstLetter = key.at(0)
    //   if (!startingLetters.includes(firstLetter)) {
    //     startingLetters.push(firstLetter)
    //   }
    // }
    // console.log(startingLetters.length, startingLetters)
  }

  return <button onClick={test}>GENERATE SOLUTION</button>;
}
