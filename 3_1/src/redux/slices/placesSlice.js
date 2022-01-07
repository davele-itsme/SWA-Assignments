import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    updatePlaces: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePlaces } = placesSlice.actions;

export const getPlaces = (state) => state.places.value;

export default placesSlice.reducer;
