import React, { useContext, useState, useEffect } from "react";
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

  // Pre-calculate vehicle usage to disable unavailable ones
  const calculateVehicleUsage = (selections) => {
    const usage = {};
    selections.forEach((cop) => {
      if (cop.vehicle) {
        usage[cop.vehicle] = (usage[cop.vehicle] || 0) + 1;
      }
    });
    return usage;
  };

  const getDistanceForCity = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    return city ? city.distance * 2 : 0;
  };

  const isDisabled = (vehicle, roundTripDistance, usageCount) => {
    return vehicle.range < roundTripDistance || usageCount >= vehicle.count;
  };

  const handleSubmit = (values) => {
    setCopSelections(values.selections);
    navigate("/result");
  };

  return (
    <div className="min-h-screen p-6 bg-green-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Vehicle Selection</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          const vehicleUsage = calculateVehicleUsage(values.selections);

          return (
            <Form className="space-y-4 w-full max-w-xl">
              {values.selections.map((cop, index) => {
                const roundTripDistance = getDistanceForCity(cop.city);
                const usageCount = (vehicleName) =>
                  values.selections.filter((s, i) => i !== index && s.vehicle === vehicleName).length;

                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg"
                  >
                    <span className="text-lg font-semibold">
                      {cop.name} - {cop.city} ({roundTripDistance / 2} KM)
                    </span>
                    <div className="mt-2 md:mt-0 w-full md:w-1/2">
                      <Field
                        as="select"
                        name={`selections[${index}].vehicle`}
                        className="w-full border border-gray-300 rounded px-4 py-2"
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
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                );
              })}

              <button
                type="submit"
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Submit & See Result
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default VehicleSelection;
