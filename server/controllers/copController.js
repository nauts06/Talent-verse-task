const cities = require("../models/cities");

const submitSelections = (req, res) => {
  const copSelections = req.body;
  

  const criminalCity = cities[Math.floor(Math.random() * cities.length)];
  console.log("criminalCity",criminalCity);
  let capturedBy = null;

  for (const cop of copSelections) {
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
