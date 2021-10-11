import {
  TypesEnum,
  TemperatureUnitEnum,
  PrecipitationUnitEnum,
  WindUnitEnum,
} from "./common/Enums.mjs";
import { Temperature } from "./history/weatherdata/Temperature.mjs";
import { Precipitation } from "./history/weatherdata/Precipitation.mjs";
import { Wind } from "./history/weatherdata/Wind.mjs";
import { WeatherHistory } from "./history/WeatherHistory.mjs";
import { EventClass } from "./common/EventClass.mjs";
import { WeatherData } from "./history/weatherdata/WeatherData.mjs";
import { DateInterval } from "./common/DateInterval.mjs";

//TESTING

var temperature = new Temperature(
  new Date(2015, 6, 5),
  "Prague",
  TypesEnum.US,
  TemperatureUnitEnum.F,
  5
);
console.log(temperature.getValue() + " " + temperature.getUnit());
temperature.convertToC();
console.log(temperature.getValue() + " " + temperature.getUnit());
temperature.convertToF();
console.log(temperature.getValue() + " " + temperature.getUnit());

console.log("-------------------------");

var precipitation = new Precipitation(
  new Date(2016, 5, 5),
  "London",
  TypesEnum.US,
  PrecipitationUnitEnum.INCHES,
  10,
  "something"
);
console.log(precipitation.getValue() + " " + precipitation.getUnit());
precipitation.convertToMM();
console.log(precipitation.getValue() + " " + precipitation.getUnit());
precipitation.convertToInches();
console.log(precipitation.getValue() + " " + precipitation.getUnit());

console.log("-------------------------");

var wind = new Wind(
  new Date(2019, 5, 5),
  "Copenhagen",
  TypesEnum.US,
  WindUnitEnum.MPH,
  10,
  "west"
);
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMS();
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMPH();
console.log(wind.getValue() + " " + wind.getUnit());

console.log("-------------------------");

const weathers = [temperature, precipitation, wind];
const weatherHistory = new WeatherHistory(weathers);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setTypeFilter(TypesEnum.US);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setPlaceFilter("Prague");
console.log(weatherHistory.getPlaceFilter());
weatherHistory.setPeriodFilter(
  new DateInterval(new Date(2010, 5, 5), Date.now())
);
console.log(weatherHistory.getPeriodFilter());
console.log(weatherHistory.getFilteredData());

console.log("-------------------------------------------------");

const eventClass = new EventClass(new Date(2011, 6, 6), "HoChiMin");
console.log(eventClass.__proto__);
const weatherData = new WeatherData(
  new Date(2015, 5, 5),
  "Prague",
  TypesEnum.US,
  "something",
  "some"
);
console.log(weatherData);
console.log(Object.getPrototypeOf(weatherData));
