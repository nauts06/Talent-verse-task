// src/pages/CitySelection.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import  {GameContext}  from "../contexts/GameContexts";
import { cities } from "../data/cities";

const CitySelection = () => {
  const { copSelections, setCopSelections } = useContext(GameContext);
  const [localSelections, setLocalSelections] = useState(copSelections);
  const navigate = useNavigate();

  const handleCityChange = (index, city) => { 

    //  console.log("city",city , index)
        //  console.log("localSelections",localSelections)

    const updated = [...localSelections];
    //  console.log("localSelections...",...localSelections)
    //   console.log("updatedOLd",updated)
    updated[index].city = city;

    setLocalSelections(updated);
  };

  const handleSubmit = () => {

   

    setCopSelections(localSelections);
     navigate("/vehicle-selection");

  };

  return (
    <div className="min-h-screen p-6 bg-yellow-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">City Selection</h2>
      <div className="space-y-4 w-full max-w-xl">
  {localSelections.map((cop, index) => (
    <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg">
      <span className="text-lg font-semibold">{cop.name}</span>
      <select
        className="mt-2 md:mt-0 border border-gray-300 rounded px-4 py-2"
        value={cop.city}
        onChange={(e) => handleCityChange(index, e.target.value)}
      >
        <option value="">Select a City</option>
        {cities.map((city) => {
        let isSelectedByAnother = false
          
          for (let i = 0; i < localSelections.length; i++) {
          if (i !== index && localSelections[i].city === city.name) {
            isSelectedByAnother = true;
            break;
          }
        }
          return (
            <option
              key={city.name}
              value={city.name}
              disabled={isSelectedByAnother}
            >
              {city.name} ({city.distance} KM) {isSelectedByAnother ? " - Taken" : ""}
            </option>
          );
        })}
      </select>
    </div>
  ))}
</div>


      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Proceed to Vehicle Selection
      </button>
    </div>
  );
};

export default CitySelection;
