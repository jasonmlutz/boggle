import React, { createContext, useState } from "react";

export const WordHoverContext = createContext();

export const WordHoverProvider = ({ children }) => {
  const [wordHover, setWordHover] = useState([]);
  return (
    <WordHoverContext.Provider value={{ wordHover, setWordHover }}>
      {children}
    </WordHoverContext.Provider>
  );
};
