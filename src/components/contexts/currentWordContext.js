import React, { createContext, useState } from "react";

export const CurrentWordContext = createContext();

export const CurrentWordProvider = ({ children }) => {
  const [currentWord, setCurrentWord] = useState(null);
  return (
    <CurrentWordContext.Provider value={{ currentWord, setCurrentWord }}>
      {children}
    </CurrentWordContext.Provider>
  );
};
