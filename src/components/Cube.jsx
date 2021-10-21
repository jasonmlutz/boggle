import React, {useState} from "react";

import { useSingleton } from "./resources/singleton";

export default function Cube({ letters }) {
  const [letter, setLetter] = useState(() => {
    const splitLetters = letters.split(" ");
    const initialLetter = splitLetters[Math.floor(Math.random() * letters.length)];

    return initialLetter
  })

  return <div className="Cube">{letter}</div>;
}
