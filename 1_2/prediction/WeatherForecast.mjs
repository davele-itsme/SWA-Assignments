import { TemperaturePrediction } from "./weatherprediction/TemperaturePrediction.mjs";
import { PrecipitationPrediction } from "./weatherprediction/PrecipitationPrediction.mjs";
import { WindPrediction } from "./weatherprediction/WindPrediction.mjs";
import { DateInterval } from "./../common/DateInterval.mjs";

function WeatherForecast(data) {
  this.data = data;
  this.getPlaceFilter = () => this.placeFilter;
  this.setPlaceFilter = (filter) => {
    this.placeFilter = filter;
  };
  this.clearPlaceFilter = () => {
    this.placeFilter = "";
  };
  this.getTypeFilter = () => this.typeFilter;
  this.setTypeFilter = (type) => {
    this.typeFilter = type;
  };
  this.clearTypeFilter = () => {
    this.typeFilter = "";
  };
  this.getPeriodFilter = () => this.periodFilter;
  this.setPeriodFilter = (period) => {
    this.periodFilter = period;
  };
  this.clearPeriodFilter = () => {
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = new DateInterval(from, to);
    this.periodFilter = dateInterval;
  };
  this.convertToUSUnits = () => {
    this.data.forEach((weatherPrediction) => {
      switch (weatherPrediction.type) {
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
  };
  this.convertToInternationalUnits = () => {
    this.data.forEach((weatherPrediction) => {
      switch (weatherPrediction.type) {
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
  };
  this.add = (data) => {
    this.data = this.data.concat(data);
  };
  this.getFilteredPredictions = () => {
    return this.data.filter(
      (x) =>
        x.place === this.placeFilter &&
        x.type === this.typeFilter &&
        this.periodFilter.contains(x)
    );
  };
}

export { WeatherForecast };
