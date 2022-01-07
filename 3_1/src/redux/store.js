import { configureStore } from "@reduxjs/toolkit";
import historicalDataSlice from "./slices/historicalDataSlice";
import forecastDataSlice from "./slices/forecastDataSlice";
import placesSlice from "./slices/placesSlice";
import dateSlice from "./slices/dateSlice";
import weatherDataObjectSlice from "./slices/weatherDataObjectSlice";

export const store = configureStore({
  reducer: {
    historicalData: historicalDataSlice,
    forecastData: forecastDataSlice,
    places: placesSlice,
    date: dateSlice,
    weatherDataObject: weatherDataObjectSlice,
  },
});
