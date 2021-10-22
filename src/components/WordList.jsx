import React, { useContext } from "react";

import { WordListContext } from "./contexts/wordListContext";

export default function WordList() {
  const { wordList } = useContext(WordListContext);

  const wordListItems = wordList.map((word, index) => (
    <li key={index} className = "Word">{word}</li>
  ));

  return <ul className="WordList">{wordListItems}</ul>;
}
