import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updatePlaces } from "./placesSlice";

export const fetchAsyncHistoricalData = createAsyncThunk(
  "historicalData/fetchAsyncHistoricalData",
  async (_, thunkAPI) => {
    return await fetch("http://localhost:8080/data")
      .then((response) => response.json())
      .then((data) => {
        const places = data
          .map((item) => item.place)
          .filter((x, i, a) => a.indexOf(x) === i);
        thunkAPI.dispatch(updatePlaces(places));
        return data;
      });
  }
);

export const fetchAsyncFilteredHistoricalData = createAsyncThunk(
  "historicalData/fetchAsyncFilteredHistoricalData",
  async (place) => {
    return await fetch(`http://localhost:8080/data/${place}`)
      .then((response) => response.json())
      .then((data) => data);
  }
);

const initialState = {
  value: [],
};

export const historicalDataSlice = createSlice({
  name: "historicalData",
  initialState,
  reducers: {
    updateHistoricalData: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncHistoricalData.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncHistoricalData.fulfilled]: (state, { payload }) => {
      console.log("Fetched historical data successfully");
      return { ...state, value: payload };
    },
    [fetchAsyncHistoricalData.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchAsyncFilteredHistoricalData.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncFilteredHistoricalData.fulfilled]: (state, { payload }) => {
      console.log("Fetched filtered historical data successfully");
      return { ...state, value: payload };
    },
    [fetchAsyncFilteredHistoricalData.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { updateHistoricalData } = historicalDataSlice.actions;

export const getHistoricalData = (state) => state.historicalData.value;

export default historicalDataSlice.reducer;
