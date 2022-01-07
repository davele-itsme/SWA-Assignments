import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTime,
  getTime,
  updateType,
  updatePlace,
  updateUnit,
  updateValue,
  getPlace,
  getType,
  getUnit,
  getValue,
  postWeatherData,
} from "../redux/slices/weatherDataObjectSlice";

const styles = {
  input: {
    color: "white",
  },
  multilineColor: {
    color: "red",
  },
};

const TextBox = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const time = useSelector(getTime);
  const place = useSelector(getPlace);
  const type = useSelector(getType);
  const unit = useSelector(getUnit);
  const value = useSelector(getValue);

  const saveData = () => {
    let data = {
      place: place,
      time: new Date(time),
      type: type,
      unit: unit,
      value: value,
    };
    dispatch(postWeatherData(data));
    dispatch(updatePlace(""));
    dispatch(updateType(""));
    dispatch(updateUnit(""));
    dispatch(updateValue(0));
  };

  return (
    <div className="textBox">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="From"
          value={time}
          onChange={(newValue) => {
            dispatch(updateTime(newValue.toString()));
          }}
          style={{
            textColor: "#FFFFFF",
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        id="place"
        label="Place"
        variant="standard"
        value={place}
        onChange={(event) => {
          dispatch(updatePlace(event.target.value));
        }}
        InputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.input,
        }}
      />
      <TextField
        id="type"
        label="Type"
        variant="standard"
        value={type}
        onChange={(event) => {
          dispatch(updateType(event.target.value));
        }}
        InputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.input,
        }}
      />
      <TextField
        id="unit"
        label="Unit"
        variant="standard"
        value={unit}
        onChange={(event) => {
          dispatch(updateUnit(event.target.value));
        }}
        InputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.input,
        }}
      />
      <TextField
        id="value"
        label="Value"
        variant="standard"
        value={value}
        onChange={(event) => {
          dispatch(updateValue(event.target.value));
        }}
        InputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.input,
        }}
      />
      <Button variant="contained" onClick={saveData}>
        Save
      </Button>
    </div>
  );
};

export default withStyles(styles)(TextBox);
