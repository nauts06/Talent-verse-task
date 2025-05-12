import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GameContext } from "../contexts/GameContexts";
import { cities } from "../data/cities";

const CitySelection = () => {
  const { copSelections, setCopSelections } = useContext(GameContext);
  const navigate = useNavigate();

  // Yup schema for an array of objects
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

  return (
    <div className="min-h-screen p-6 bg-yellow-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">City Selection</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4 w-full max-w-xl">
            {values.selections.map((cop, index) => {
              const selectedCities = values.selections.map((s, i) =>
                i !== index ? s.city : null
              );

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg"
                >
                  <span className="text-lg font-semibold">{cop.name}</span>

                  <div className="mt-2 md:mt-0 w-full md:w-1/2">
                    <Field
                      as="select"
                      name={`selections[${index}].city`}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      onChange={(e) => {
                        setFieldValue(`selections[${index}].city`, e.target.value);
                      }}
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
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="submit"
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Vehicle Selection
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CitySelection;
