import { Temperature } from "./weatherdata/Temperature.mjs";
import { Precipitation } from "./weatherdata/Precipitation.mjs";
import { Wind } from "./weatherdata/Wind.mjs";
import { DateInterval } from "./../common/DateInterval.mjs";

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
  this.convertToInternationalUnits = () => {
    this.data.forEach((weatherData) => {
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
  this.add = (data) => {
    this.data = this.data.concat(data);
  };
  this.getFilteredData = () => {
    return this.data.filter(
      (x) =>
        x.place == this.placeFilter &&
        x.type == this.typeFilter &&
        this.periodFilter.contains(x.getTime())
    );
  };
}

export { WeatherHistory };
