import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GameContext } from "../contexts/GameContexts";
import { cities } from "../data/cities";

const CitySelection = () => {
  const { copSelections, setCopSelections } = useContext(GameContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    selections: Yup.array().of(
      Yup.object().shape({
        city: Yup.string().required("City is required"),
      })
    ),
  });

  const initialValues = {
    selections: copSelections.map((cop) => ({
      name: cop.name,
      city: cop.city || "",
    })),
  };

  const handleSubmit = (values) => {
    setCopSelections(values.selections);
    navigate("/vehicle-selection");
  };

  const getImagePath = (cityName) => {
    const fileName = cityName.replace(/\s+/g, "") + ".png";
    return require(`../assets/cities/${fileName}`);
  };

  return (
   <div className="min-h-screen p-6 bg-gradient-to-br from-slate-800 via-pink-400 to-indigo-900 flex flex-col items-center text-white">

      <h2 className="text-4xl font-bold mb-10 text-white-800">🏙️ City Selection</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 w-full max-w-5xl">
            {values.selections.map((cop, index) => {
              const selectedCities = values.selections.map((s, i) =>
                i !== index ? s.city : null
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex items-center"
                >
                  <div className="md:w-1/3 h-48 md:h-full overflow-hidden">
                    {cop.city ? (
                      <img
                        src={getImagePath(cop.city)}
                        alt={cop.city}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No City Selected
                      </div>
                    )}
                  </div>

                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{cop.name}</h3>
                    <Field
                      as="select"
                      name={`selections[${index}].city`}
                      className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                      onChange={(e) =>
                        setFieldValue(`selections[${index}].city`, e.target.value)
                      }
                    >
                      <option value="">Select a City</option>
                      {cities.map((city) => (
                        <option
                          key={city.name}
                          value={city.name}
                          disabled={selectedCities.includes(city.name)}
                        >
                          {city.name} ({city.distance} KM)
                          {selectedCities.includes(city.name) ? " - Taken" : ""}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={`selections[${index}].city`}
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg shadow-md transition"
              >
                🚗 Proceed to Vehicle Selection
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CitySelection;
