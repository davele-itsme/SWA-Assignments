import { TemperaturePrediction } from "./weatherprediction/TemperaturePrediction.mjs";
import { PrecipitationPrediction } from "./weatherprediction/PrecipitationPrediction.mjs";
import { WindPrediction } from "./weatherprediction/WindPrediction.mjs";
import { DateInterval } from "./../common/DateInterval.mjs";

function WeatherForecast(data) {
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
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof TemperaturePrediction:
          weatherPrediction.convertToF();
        case weatherPrediction instanceof PrecipitationPrediction:
          weatherPrediction.convertToInches();
        case weatherPrediction instanceof WindPrediction:
          weatherPrediction.convertToMPH();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.convertToInternationalUnits = () => {
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof TemperaturePrediction:
          weatherPrediction.convertToC();
        case weatherPrediction instanceof PrecipitationPrediction:
          weatherPrediction.convertToMM();
        case weatherPrediction instanceof WindPrediction:
          weatherPrediction.convertToMS();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.add = (data) => {
    state.data = state.data.concat(data);
  };

  methods.getFilteredPredictions = () => {
    return state.data.filter(
      (x) =>
        x.getPlace() == state.placeFilter &&
        x.getType() == state.typeFilter &&
        state.periodFilter.contains(x.getTime())
    );
  };

  return methods;
}

export { WeatherForecast };
