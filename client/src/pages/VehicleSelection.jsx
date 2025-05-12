import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GameContext } from "../contexts/GameContexts";
import { vehicles as vehicleData } from "../data/vehicles";
import { cities } from "../data/cities";

const VehicleSelection = () => {
  const { copSelections, setCopSelections } = useContext(GameContext);
  const navigate = useNavigate();

  const initialValues = {
    selections: copSelections.map((cop) => ({
      name: cop.name,
      city: cop.city,
      vehicle: cop.vehicle || "",
    })),
  };

  const validationSchema = Yup.object().shape({
    selections: Yup.array().of(
      Yup.object().shape({
        vehicle: Yup.string().required("Vehicle is required"),
      })
    ),
  });

  const getDistanceForCity = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    return city ? city.distance * 2 : 0;
  };

  const isDisabled = (vehicle, roundTripDistance, usageCount) => {
    return vehicle.range < roundTripDistance || usageCount >= vehicle.count;
  };

  const getVehicleImage = (vehicleName) => {
    const fileName = vehicleName.replace(/\s+/g, "") + ".png"; 
    try {
      return require(`../assets/vehicles/${fileName}`);
    } catch {
      return null;
    }
  };

  const handleSubmit = (values) => {
    setCopSelections(values.selections);
    navigate("/result");
  };

  return (
   <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center">
  <h2 className="text-4xl font-bold mb-10 text-gray-200">🚗 Vehicle Selection</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 w-full max-w-5xl">
            {values.selections.map((cop, index) => {
              const roundTripDistance = getDistanceForCity(cop.city);
              const usageCount = (vehicleName) =>
                values.selections.filter((s, i) => i !== index && s.vehicle === vehicleName).length;

              const selectedVehicle = vehicleData.find(v => v.name === cop.vehicle);
              const selectedImage = selectedVehicle ? getVehicleImage(selectedVehicle.name) : null;

              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex items-center">
                  <div className="md:w-1/3 h-48 md:h-full overflow-hidden">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt={cop.vehicle}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Vehicle Selected
                      </div>
                    )}
                  </div>

                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {cop.name} - {cop.city} ({roundTripDistance / 2} KM)
                    </h3>

                    <Field
                      as="select"
                      name={`selections[${index}].vehicle`}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                      onChange={(e) =>
                        setFieldValue(`selections[${index}].vehicle`, e.target.value)
                      }
                    >
                      <option value="">Select a Vehicle</option>
                      {vehicleData.map((vehicle) => {
                        const totalUsed = usageCount(vehicle.name);
                        const disabled = isDisabled(vehicle, roundTripDistance, totalUsed);

                        return (
                          <option
                            key={vehicle.name}
                            value={vehicle.name}
                            disabled={disabled}
                          >
                            {vehicle.name} - {vehicle.range} KM
                            {disabled ? " (Unavailable)" : ""}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name={`selections[${index}].vehicle`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg shadow-md transition"
              >
                🕵️ Submit & See Result
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehicleSelection;
