import React, { createContext, useState } from "react";

export const GameContext = createContext();
const GameProvider = ({ children }) => {
  const [copSelections, setCopSelections] = useState([
    { name: "Cop 1", city: "", vehicle: "" },
    { name: "Cop 2", city: "", vehicle: "" },
    { name: "Cop 3", city: "", vehicle: "" },
  ]);

  const [result, setResult] = useState(null);

  return (
    <GameContext.Provider
      value={{ copSelections, setCopSelections, result, setResult }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
