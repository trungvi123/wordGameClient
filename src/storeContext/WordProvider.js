import React, { useState } from "react";
import WordContext from "./WordContext";

 function WordProvider({ children }) {
  const [word, setWord] = useState("");

  return (
    <WordContext.Provider  value={{ word, setWord }}>
      {children}
    </WordContext.Provider>
  );
}

export default WordProvider
