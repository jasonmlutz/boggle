import React from "react";
import { dictionary } from "./resources/OWL2";

export default function WordList({ wordList }) {
  const wordListItems = wordList.map((word, index) => {
    var classname = "Word";
    if (dictionary[word.toLowerCase()] === undefined) {
      classname += " invalidWord";
    } else {
      classname += " validWord";
    }
    return (
      <li key={index} className={classname}>
        {word}
      </li>
    );
  });

  return <ul className="WordList">{wordListItems}</ul>;
}
