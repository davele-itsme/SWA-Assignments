import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAsyncForecastData = createAsyncThunk(
  "forecastData/fetchAsyncForecastData",
  async () => {
    return await fetch("http://localhost:8080/forecast")
      .then((response) => response.json())
      .then((data) => data);
  }
);

export const fetchAsyncFilteredForecastData = createAsyncThunk(
  "forecastData/fetchAsyncFilteredForecastData",
  async (place) => {
    return await fetch(`http://localhost:8080/forecast/${place}`)
      .then((response) => response.json())
      .then((data) => data);
  }
);

const initialState = {
  value: [],
};

export const forecastDataSlice = createSlice({
  name: "forecastData",
  initialState,
  reducers: {
    updateForecastData: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncForecastData.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncForecastData.fulfilled]: (state, { payload }) => {
      console.log("Fetched forecast data successfully");
      return { ...state, value: payload };
    },
    [fetchAsyncForecastData.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchAsyncFilteredForecastData.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncFilteredForecastData.fulfilled]: (state, { payload }) => {
      console.log("Fetched filtered forecast data successfully");
      return { ...state, value: payload };
    },
    [fetchAsyncFilteredForecastData.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { updateForecastData } = forecastDataSlice.actions;

export const getForecastData = (state) => state.forecastData.value;

export default forecastDataSlice.reducer;
