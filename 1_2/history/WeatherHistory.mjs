import DateInterval from "./../common/DateInterval.mjs";
import { TypesEnum } from "../../1_1/common/Enums.mjs";

function WeatherHistory(data) {
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
    this.data.forEach((weatherData) => {
      switch (weatherData.type) {
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
  };
  this.convertToInternationalUnits = () => {
    this.data.forEach((weatherData) => {
      switch (weatherData.type) {
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
  };
  this.add = (data) => {
    this.data = this.data.concat(data);
  };
  this.getFilteredData = () => {
    return this.data.filter(
      (x) =>
        x.place === this.placeFilter &&
        x.type === this.typeFilter &&
        this.periodFilter.contains(x.time)
    );
  };
}

export default WeatherHistory;
