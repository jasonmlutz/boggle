import React, { createContext, useState } from "react";

export const WordListContext = createContext();

export const WordListProvider = ({ children }) => {
  const [wordList, setWordList] = useState([]);
  return (
    <WordListContext.Provider value={{ wordList, setWordList }}>
      {children}
    </WordListContext.Provider>
  );
};
