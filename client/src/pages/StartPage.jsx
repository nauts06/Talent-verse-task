import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/city-selection");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6">🚨 Fugitive Hunt 🚨</h1>
      <p className="mb-8 text-xl text-center">Help the cops catch the criminal hiding in one of the cities!</p>
      <button
        onClick={handleStart}
        className="bg-white text-purple-700 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-purple-100 shadow-md transition"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
