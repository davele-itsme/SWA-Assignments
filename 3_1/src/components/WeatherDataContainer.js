import React, { useEffect, useCallback } from "react";
import { HistoricalDataList } from "./HistoricalDataList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncHistoricalData,
  getHistoricalData,
} from "../redux/slices/historicalDataSlice";
import {
  fetchAsyncForecastData,
  getForecastData,
} from "../redux/slices/forecastDataSlice";
import DropdownMenu from "./DropdownMenu";
import FromDatePicker from "./FromDatePicker";
import { getFrom, getTo } from "../redux/slices/dateSlice";
import { ForecastDataList } from "./ForecastDataList";
import ToDatePicker from "./ToDatePicker";
import Button from "@mui/material/Button";
import TextBox from "./TextBox";

export const WeatherDataContainer = () => {
  const dispatch = useDispatch();

  const reloadData = useCallback(() => {
    dispatch(fetchAsyncHistoricalData());
    dispatch(fetchAsyncForecastData());
  }, [dispatch]);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const historicalData = useSelector(getHistoricalData);
  const forecastData = useSelector(getForecastData);
  const from = useSelector(getFrom);
  const to = useSelector(getTo);

  // const [from, setFrom] = useState(dateStore.getFrom());

  // useEffect(() => {
  //   dateStore.addChangeListener(onChange);
  //   return () => dateStore.removeChangeListener(onChange);
  // }, []);

  // function onChange() {
  //   setFrom(dateStore.getFrom());
  // }

  return (
    <div className="container">
      <div className="filters">
        <DropdownMenu />
        <FromDatePicker from={from} />
        <ToDatePicker to={to} />
        <Button variant="contained" onClick={reloadData}>
          Reload
        </Button>
      </div>
      <div className="tables">
        <HistoricalDataList data={historicalData} from={from} to={to} />
        <ForecastDataList data={forecastData} from={from} to={to} />
      </div>
      <TextBox></TextBox>
    </div>
  );
};
