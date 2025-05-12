import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const { copSelections, result, setResult } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // const response = await axios.post("http://localhost:5000/api/submit", copSelections);
        const response = await axios.post("https://talent-verse-task-production.up.railway.app/api/submit", copSelections);
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [copSelections, setResult]);

  if (!result) return <div className="p-6 text-center">Calculating result...</div>;

  // Dynamically get background and image paths
  const getCityBackground = (cityName) => {
    const fileName = cityName.replace(/\s+/g, "") + ".png";
    try {
      return require(`../assets/cities/${fileName}`);
    } catch {
      return null;
    }
  };

  const getCopImage = (copName) => {
    try {
      const number = copName.split(" ")[1]; // Cop 1 → 1
      return require(`../assets/cops/Cop${number}.png`);
    } catch {
      return null;
    }
  };

  const backgroundImage = getCityBackground(result.criminalCity);
  const capturedCopImage = result.capturedBy ? getCopImage(result.capturedBy) : null;
  const criminalImage = require("../assets/criminal.png");

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8 text-white text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-4xl font-bold mb-4">🎯 Game Result</h2>
        <p className="text-xl mb-4">
          The criminal was hiding in <strong>{result.criminalCity}</strong>.
        </p>

        {result.captured ? (
          <>
            <p className="text-green-400 text-2xl font-semibold mb-4">
              🕵️ {result.capturedBy} successfully captured the fugitive!
            </p>
            {capturedCopImage && (
              <img
                src={capturedCopImage}
                alt={result.capturedBy}
                className="w-48 h-48 rounded-full mx-auto shadow-lg border-4 border-green-500"
              />
            )}
          </>
        ) : (
          <>
            <p className="text-red-400 text-2xl font-semibold mb-4">
              😞 All cops failed. The fugitive escaped!
            </p>
            <img
              src={criminalImage}
              alt="Criminal"
              className="w-48 h-48 rounded-full mx-auto shadow-lg border-4 border-red-500"
            />
          </>
        )}

        <button
          className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
          onClick={() => navigate("/")}
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
