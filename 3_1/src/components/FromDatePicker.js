import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch } from "react-redux";
import { updateFrom } from "../redux/slices/dateSlice";

export default function FromDatePicker({ from }) {
  const dispatch = useDispatch();

  const setDateValue = (value) => {
    dispatch(updateFrom(value.toString()));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="From"
        value={from}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        style={{
          textColor: "#FFFFFF",
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
