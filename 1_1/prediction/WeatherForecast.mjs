import TemperaturePrediction from "./weatherprediction/TemperaturePrediction.mjs";
import PrecipitationPrediction from "./weatherprediction/PrecipitationPrediction.mjs";
import WindPrediction from "./weatherprediction/WindPrediction.mjs";
import DateInterval from "./../common/DateInterval.mjs";
import { TypesEnum } from "../common/Enums.mjs";

function WeatherForecast(data) {
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
      state.data.forEach((weatherPrediction) => {
        switch (weatherPrediction.getType()) {
          case TypesEnum.TEMPERATURE:
            weatherPrediction.convertToF();
          case TypesEnum.PRECIPITATION:
            weatherPrediction.convertToInches();
          case TypesEnum.WIND:
            weatherPrediction.convertToMPH();
          default:
            console.log("Error when converting to US units.");
        }
      });
    },
    convertToInternationalUnits() {
      state.data.forEach((weatherPrediction) => {
        switch (weatherPrediction.getType()) {
          case TypesEnum.TEMPERATURE:
            weatherPrediction.convertToC();
          case TypesEnum.PRECIPITATION:
            weatherPrediction.convertToMM();
          case TypesEnum.WIND:
            weatherPrediction.convertToMS();
          default:
            console.log("Error when converting to International units.");
        }
      });
    },
    add(data) {
      state.data = state.data.concat(data);
    },
    getFilteredPredictions() {
      return state.data.filter(
        (x) =>
          x.getPlace() === state.placeFilter &&
          x.getType() === state.typeFilter &&
          state.periodFilter.contains(x.getTime())
      );
    },
  };
}

export default WeatherForecast;
