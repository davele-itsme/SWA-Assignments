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
import { EventData } from "./common/EventData.mjs";

//TESTING

var temperature = new Temperature(
  new Date(2015, 6, 5),
  "Prague",
  TypesEnum.US,
  TemperatureUnitEnum.F,
  15
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
  45,
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
  11,
  "west"
);
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMS();
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMPH();
console.log(wind.getValue() + " " + wind.getUnit());

console.log("-------------------------");

const weathers = [temperature, precipitation, wind];
const weathers2 = [temperature];
const weatherHistory = new WeatherHistory(weathers);
const weatherHistory2 = new WeatherHistory(weathers2);
console.log(weatherHistory.including(weathers2).length == 4);
const lol = weatherHistory.forPlace("Copenhagen");
console.log(lol.getData().length == 1);
console.log(weatherHistory.lowestValue());
console.log(weatherHistory.highestValue());
console.log(weatherHistory2.getData());

console.log("-------------------------");

//Immutability

const eventData = new EventData(1, 2, 3, 4);
console.log(eventData.getType());
console.log(eventData.twe);
eventData.time = "hello";
console.log(eventData);
