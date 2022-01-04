import React, {useContext} from "react";
import { dictionary } from "./resources/OWL2";

import { WordHoverContext } from "./contexts/wordHoverContext";

export default function WordList({ wordList }) {
  const {wordHover, setWordHover} = useContext(WordHoverContext);

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
