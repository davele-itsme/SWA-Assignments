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
import { DateInterval } from "./common/DateInterval.mjs";
import { PrecipitationPrediction } from "./prediction/weatherprediction/PrecipitationPrediction.mjs";

//TESTING

var temperature = Temperature(
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

var precipitation = Precipitation(
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

var wind = Wind(
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
const weatherHistory = WeatherHistory(weathers);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setTypeFilter(TypesEnum.US);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setPlaceFilter("Prague");
console.log(weatherHistory.getPlaceFilter());
weatherHistory.setPeriodFilter(DateInterval(new Date(2010, 5, 5), Date.now()));
console.log(weatherHistory.getPeriodFilter());
console.log(weatherHistory.getFilteredData());
