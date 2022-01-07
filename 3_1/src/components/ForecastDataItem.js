import React from "react";

export const ForecastDataItem = ({ item }) => {
  return (
    <tr>
      <td>{item.time}</td>
      <td>{item.place}</td>
      <td>{item.type}</td>
      <td>{item.unit}</td>
      <td>{item.from}</td>
      <td>{item.to}</td>
    </tr>
  );
};
