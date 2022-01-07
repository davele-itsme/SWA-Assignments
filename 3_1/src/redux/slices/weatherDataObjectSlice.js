import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAsyncFilteredHistoricalData } from "./historicalDataSlice";

export const postWeatherData = createAsyncThunk(
  "weatherDataObject/postWeatherData",
  async (data, thunkAPI) => {
    fetch("http://localhost:8080/data", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          thunkAPI.dispatch(fetchAsyncFilteredHistoricalData(data.place));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const initialState = {
  time: new Date().toString(),
  place: "",
  type: "",
  unit: "",
  value: 0,
};

export const weatherDataObjectSlice = createSlice({
  name: "weatherDataObject",
  initialState,
  reducers: {
    updateTime: (state, action) => {
      state.time = action.payload;
    },
    updatePlace: (state, action) => {
      state.place = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
    updateUnit: (state, action) => {
      state.unit = action.payload;
    },
    updateValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTime, updatePlace, updateType, updateUnit, updateValue } =
  weatherDataObjectSlice.actions;

export const getTime = (state) => state.weatherDataObject.time;
export const getPlace = (state) => state.weatherDataObject.place;
export const getType = (state) => state.weatherDataObject.type;
export const getUnit = (state) => state.weatherDataObject.unit;
export const getValue = (state) => state.weatherDataObject.value;

export default weatherDataObjectSlice.reducer;
