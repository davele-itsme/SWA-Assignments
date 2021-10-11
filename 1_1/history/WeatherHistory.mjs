import { Temperature } from "./weatherdata/Temperature.mjs";
import { Precipitation } from "./weatherdata/Precipitation.mjs";
import { Wind } from "./weatherdata/Wind.mjs";
import { DateInterval } from "./../common/DateInterval.mjs";

function WeatherHistory(data) {
  const state = { data };
  const methods = {};

  methods.getPlaceFilter = () => state.placeFilter;

  methods.setPlaceFilter = (filter) => {
    state.placeFilter = filter;
  };

  methods.clearPlaceFilter = () => {
    state.placeFilter = "";
  };

  methods.getTypeFilter = () => state.typeFilter;

  methods.setTypeFilter = (type) => {
    state.typeFilter = type;
  };

  methods.clearTypeFilter = () => {
    state.typeFilter = "";
  };

  methods.getPeriodFilter = () => state.periodFilter;

  methods.setPeriodFilter = (period) => {
    state.periodFilter = period;
  };

  methods.clearPeriodFilter = () => {
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = DateInterval(from, to);
    state.periodFilter = dateInterval;
  };

  methods.convertToUSUnits = () => {
    state.data.forEach((weatherData) => {
      switch (true) {
        case weatherData instanceof Temperature:
          weatherData.convertToF();
        case weatherData instanceof Precipitation:
          weatherData.convertToInches();
        case weatherData instanceof Wind:
          weatherData.convertToMPH();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.convertToInternationalUnits = () => {
    state.data.forEach((weatherData) => {
      switch (true) {
        case weatherData instanceof Temperature:
          weatherData.convertToC();
        case weatherData instanceof Precipitation:
          weatherData.convertToMM();
        case weatherData instanceof Wind:
          weatherData.convertToMS();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.add = (data) => {
    state.data = state.data.concat(data);
  };

  methods.getFilteredData = () => {
    return state.data.filter(
      (x) =>
        x.getPlace() == state.placeFilter &&
        x.getType() == state.typeFilter &&
        state.periodFilter.contains(x.getTime())
    );
  };

  return methods;
}

export { WeatherHistory };
