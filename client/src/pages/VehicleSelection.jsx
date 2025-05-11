import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GameContext } from "../context/GameContext";
import { GameContext } from "../contexts/GameContexts";
import { vehicles as vehicleData } from "../data/vehicles";
import { cities } from "../data/cities";

const VehicleSelection = () => {
  const { copSelections, setCopSelections } = useContext(GameContext);
  const [localSelections, setLocalSelections] = useState(
    copSelections.map((cop) => ({ ...cop }))
  );


  console.log("localSelections", localSelections);
  console.log("copSelections", localSelections);
  
  const [vehicleUsage, setVehicleUsage] = useState({});
  const navigate = useNavigate();

  const getDistanceForCity = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    return city ? city.distance * 2 : 0; // round trip
  };

  const isVehicleAvailable = (vehicleName, distance) => {
    const vehicle = vehicleData.find((v) => v.name === vehicleName);
    if (!vehicle) return false;

    const alreadyUsed = vehicleUsage[vehicleName] || 0;
    return vehicle.range >= distance && alreadyUsed < vehicle.count;
  };

  const handleVehicleChange = (index, vehicleName) => {
    const updatedSelections = [...localSelections];
    updatedSelections[index].vehicle = vehicleName;

    // Update usage counts
    const usage = {};
    updatedSelections.forEach((cop) => {
      if (cop.vehicle) {
        usage[cop.vehicle] = (usage[cop.vehicle] || 0) + 1;
      }
    });

    setLocalSelections(updatedSelections);
    setVehicleUsage(usage);
  };

  const handleSubmit = () => {

    setCopSelections(localSelections);
    navigate("/result");
  };

  return (
    <div className="min-h-screen p-6 bg-green-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Vehicle Selection</h2>
      <div className="space-y-4 w-full max-w-xl">
        {localSelections.map((cop, index) => {

            
            
          const roundTripDistance = getDistanceForCity(cop.city);
// console.log("roundTripDistance", roundTripDistance);


          return (
            <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg">
              <span className="text-lg font-semibold">
                {cop.name} - {cop.city} ({roundTripDistance / 2} KM)
              </span>
              <select
                className="mt-2 md:mt-0 border border-gray-300 rounded px-4 py-2"
                value={cop.vehicle}
                onChange={(e) => handleVehicleChange(index, e.target.value)}
              >
                <option value="" >Select a Vehicle</option>
                {vehicleData.map((v) => {

                    // console.log("asdfghjk", v);
                    
  const vehicleRange = v.range;
  const vehicleLimit = v.count;
  const vehicleName = v.name;

  console.log("vehicleUsage", vehicleUsage);
  console.log("vehicleUsage", vehicleUsage[vehicleName]);
  
  const vehicleAlreadyUsed = vehicleUsage[vehicleName] || 0;

//   console.log("asdfghjk", vehicleAlreadyUsed);

  const notEnoughRange = vehicleRange < roundTripDistance;
//   console.log("notEnoughRange", notEnoughRange);
  const noMoreAvailable = vehicleAlreadyUsed >= vehicleLimit;

  const disabled = notEnoughRange || noMoreAvailable;

  return (
    <option key={vehicleName} value={vehicleName} disabled={disabled}>
      {vehicleName} - {vehicleRange} KM
      {disabled ? " (Unavailable)" : ""}
    </option>
  );
})}

              </select>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Submit & See Result
      </button>
    </div>
  );
};

export default VehicleSelection;
