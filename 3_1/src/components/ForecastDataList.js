import React from "react";
import { ForecastDataItem } from "./ForecastDataItem";
import Paper from "@mui/material/Paper";

export const ForecastDataList = ({ data, from, to }) => {
  return (
    <Paper className="paper">
      <h3>Weather forecast data</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Place</th>
            <th>Type</th>
            <th>Unit</th>
            <th>from</th>
            <th>to</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length !== 0
            ? data
                .filter(
                  (item) =>
                    new Date(from) < new Date(item.time) &&
                    new Date(to) > new Date(item.time)
                )
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .slice(0, 20)
                .map((item, id) => {
                  return <ForecastDataItem key={id} item={item} />;
                })
            : null}
        </tbody>
      </table>
    </Paper>
  );
};
