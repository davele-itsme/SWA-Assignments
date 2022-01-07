import { createSlice } from "@reduxjs/toolkit";

const createDateWithOffset = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const initialState = {
  from: createDateWithOffset(-7).toString(),
  to: new Date().toString(),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    updateFrom: (state, action) => {
      state.from = action.payload;
    },
    updateTo: (state, action) => {
      state.to = action.payload;
    },
  },
});

export const { updateFrom, updateTo } = dateSlice.actions;

export const getFrom = (state) => state.date.from;
export const getTo = (state) => state.date.to;

export default dateSlice.reducer;
