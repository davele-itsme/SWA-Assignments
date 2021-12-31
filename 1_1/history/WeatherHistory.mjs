import { TypesEnum } from "../common/Enums.mjs";
import DateInterval from "./../common/DateInterval.mjs";

function WeatherHistory(data) {
  const state = { data };

  return {
    getPlaceFilter() {
      return state.placeFilter;
    },
    setPlaceFilter(filter) {
      state.placeFilter = filter;
    },
    clearPlaceFilter() {
      state.placeFilter = "";
    },
    getTypeFilter() {
      return state.typeFilter;
    },
    setTypeFilter(type) {
      state.typeFilter = type;
    },
    clearTypeFilter() {
      state.typeFilter = "";
    },
    getPeriodFilter() {
      return state.periodFilter;
    },
    setPeriodFilter(period) {
      state.periodFilter = period;
    },
    clearPeriodFilter() {
      let from = new Date(2000, 1, 1);
      let to = Date.now();
      let dateInterval = DateInterval(from, to);
      state.periodFilter = dateInterval;
    },
    convertToUSUnits() {
      state.data.forEach((weatherData) => {
        switch (weatherData.getType()) {
          case TypesEnum.TEMPERATURE:
            weatherData.convertToF();
          case TypesEnum.PRECIPITATION:
            weatherData.convertToInches();
          case TypesEnum.WIND:
            weatherData.convertToMPH();
          default:
            console.log("Error when converting to US units.");
        }
      });
    },
    convertToInternationalUnits() {
      state.data.forEach((weatherData) => {
        switch (weatherData.getType()) {
          case TypesEnum.TEMPERATURE:
            weatherData.convertToC();
          case TypesEnum.PRECIPITATION:
            weatherData.convertToMM();
          case TypesEnum.WIND:
            weatherData.convertToMS();
          default:
            console.log("Error when converting to International units.");
        }
      });
    },
    add(data) {
      state.data = state.data.concat(data);
    },
    getFilteredData() {
      return state.data.filter(
        (x) =>
          x.getPlace() === state.placeFilter &&
          x.getType() === state.typeFilter &&
          state.periodFilter.contains(x.getTime())
      );
    },
  };
}

export default WeatherHistory;
