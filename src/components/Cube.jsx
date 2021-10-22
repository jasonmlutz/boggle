import React, {useState} from "react";

export default function Cube({ letters }) {
  const [letter] = useState(() => {
    const splitLetters = letters.split(" ");
    const initialLetter = splitLetters[Math.floor(Math.random() * splitLetters.length)];

    return initialLetter
  })

  return <div className = "Cube"><p>{letter}</p></div>;
}
