import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch } from "react-redux";
import { updateTo } from "../redux/slices/dateSlice";

export default function FromDatePicker({ to }) {
  const dispatch = useDispatch();

  const setDateValue = (value) => {
    dispatch(updateTo(value.toString()));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Until"
        value={to}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
