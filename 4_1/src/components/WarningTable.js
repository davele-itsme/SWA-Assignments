import React from "react";
import PredictionItem from "./PredictionItem";

const WarningTable = ({ warnings, severity }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Severity</th>
            <th>Type</th>
            <th>Time</th>
            <th>Place</th>
            <th>From</th>
            <th>To</th>
            <th>Unit</th>
            <th>More information</th>
          </tr>
        </thead>
        <tbody>
          {warnings !== null
            ? warnings
                .filter((warning) => severity <= warning.severity)
                .map((warning) => {
                  return (
                    <PredictionItem
                      key={warning.id}
                      severity={warning.severity}
                      prediction={warning.prediction}
                    />
                  );
                })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default WarningTable;
