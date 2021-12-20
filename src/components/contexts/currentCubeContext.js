import React, { createContext, useState } from "react";

export const CurrentCubeContext = createContext();

export const CurrentCubeProvider = ({ children }) => {
  const [currentCube, setCurrentCube] = useState([]);
  return (
    <CurrentCubeContext.Provider value={{ currentCube, setCurrentCube }}>
      {children}
    </CurrentCubeContext.Provider>
  );
};
