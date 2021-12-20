import React from "react";

export default function WordList({wordList}) {
  const wordListItems = wordList.map((word, index) => (
    <li key={index} className = "Word">{word}</li>
  ));

  return <ul className="WordList">{wordListItems}</ul>;
}
