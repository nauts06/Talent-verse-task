import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GameProvider from "./contexts/GameContexts";
import CitySelection from "./pages/CitySelection";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
            <Route path="/city-selection" element={<CitySelection />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
