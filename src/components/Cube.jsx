import React, {useState} from "react";

import { useSingleton } from "./resources/singleton";

export default function Cube({ letters }) {
  const [letter, setLetter] = useState("")

  useSingleton(() => {
    setLetter(letters[Math.floor(Math.random() * letters.length)])
  })

  return <div className="Cube">{letter}</div>;
}
