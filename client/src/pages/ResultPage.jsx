import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const { copSelections, result, setResult } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!copSelections || !copSelections[0].vehicle) {
      navigate("/");
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/submit", copSelections);
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

   fetchResult();
  }, [copSelections, navigate, setResult]);

  if (!result) return <div className="p-6 text-center">Calculating result....</div>;

  return (
    <div className="min-h-screen p-8 bg-purple-50 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-4"> Result</h2>
      <p className="text-xl mb-2">Criminal was hiding in <strong>{result.criminalCity}</strong>.</p>
      {result.captured ? (
        <p className="text-green-600 text-2xl font-semibold mt-4">
         {result.capturedBy} successfully captured the fugitive!
        </p>
      ) : (
        <p className="text-red-600 text-2xl font-semibold mt-4">
               All cops failed. The fugitive escaped!
        </p>
      )}

      <button
        className="mt-10 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => navigate("/")}
      >
         Play Again
      </button>
    </div>
  );
};

export default ResultPage;
