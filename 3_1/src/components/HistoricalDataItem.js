import React from "react";

export const HistoricalDataItem = ({ item }) => {
  return (
    <tr>
      <td>{item.time}</td>
      <td>{item.place}</td>
      <td>{item.type}</td>
      <td>{item.unit}</td>
      <td>{item.value}</td>
    </tr>
  );
};
