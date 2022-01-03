import React from "react";
import { dictionary } from "./resources/OWL2";

export default function WordList({ wordList }) {
  const wordListItems = Object.keys(wordList).map((word, index) => {
    var classname = "Word";
    var definition = dictionary[word.toLowerCase()];
    if (definition === undefined) {
      classname += " invalidWord";
    } else {
      classname += " validWord";
    }
    function displayDefinition() {
      if (definition === undefined) {
        console.log("no such word")
      } else {
        console.log(definition)
      }
    }
    return (
      <li key={index} className={classname} onClick = {displayDefinition}>
        {word}
      </li>
    );
  });

  return <ul className="WordList">{wordListItems}</ul>;
}
