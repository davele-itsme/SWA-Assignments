import React from "react";

const PredictionItem = ({ severity, prediction }) => {
  return (
    <tr>
      <td>{severity}</td>
      <td>{prediction.type}</td>
      <td>{prediction.time}</td>
      <td>{prediction.place}</td>
      <td>{prediction.from}</td>
      <td>{prediction.to}</td>
      <td>{prediction.unit}</td>
      <td>
        {prediction.type === "precipitation"
          ? prediction.precipitation_types.map((type) => type + " ")
          : prediction.directions.map((direction) => direction + " ")}
      </td>
    </tr>
  );
};

export default PredictionItem;
