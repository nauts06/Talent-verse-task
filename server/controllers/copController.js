const cities = require("../models/cities");
const vehicles = require("../models/vehicles");

let clonedVehicles;




const submitSelections = (req, res) => {
  const copSelections = req.body;

  clonedVehicles = vehicles.map(v => ({ ...v }));

  const criminalCity = cities[Math.floor(Math.random() * cities.length)];

  const vehicleUsage = {};
  let capturedBy = null;

  for (const cop of copSelections) {
    const selectedCity = cities.find((c) => c.name === cop.city);
    const vehicle = clonedVehicles.find((v) => v.name === cop.vehicle);

    if (!selectedCity || !vehicle) continue;

    const requiredDistance = selectedCity.distance * 2;
    if (vehicle.range < requiredDistance) continue;

    vehicleUsage[cop.vehicle] = (vehicleUsage[cop.vehicle] || 0) + 1;
    if (vehicleUsage[cop.vehicle] > vehicle.count) continue;

    if (cop.city === criminalCity.name && !capturedBy) {
      capturedBy = cop.name;
    }
  }

  res.json({
    criminalCity: criminalCity.name,
    captured: !!capturedBy,
    capturedBy,
  });
};

module.exports = {

 
  submitSelections,
};
