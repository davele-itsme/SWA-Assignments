import {
  TypesEnum,
  TemperatureUnitEnum,
  PrecipitationUnitEnum,
  WindUnitEnum,
} from "./common/Enums.mjs";
import Temperature from "./history/weatherdata/Temperature.mjs";
import Precipitation from "./history/weatherdata/Precipitation.mjs";
import Wind from "./history/weatherdata/Wind.mjs";
import WeatherHistory from "./history/WeatherHistory.mjs";
import WeatherData from "./history/weatherdata/WeatherData.mjs";
import DateInterval from "./common/DateInterval.mjs";
import Event from "./common/Event.mjs";
import DataType from "./common/DataType.mjs";

//TESTING

console.log("DataType");

let dataType = new DataType("type", "unit");
console.log(dataType.getType() === "type");
console.log(dataType.getUnit() === "unit");

console.log(Object.getPrototypeOf(dataType));

console.log("-------------------------------------");

console.log("Temperature");

let temperature = new Temperature(
  new Date(2015, 6, 5),
  "Prague",
  TypesEnum.TEMPERATURE,
  TemperatureUnitEnum.F,
  5
);

console.log(temperature.getValue() === 5);
console.log(temperature.getUnit() === TemperatureUnitEnum.F);

temperature.convertToC();

console.log(temperature.getUnit() === TemperatureUnitEnum.C);

temperature.convertToF();
console.log(temperature.getValue() === 5);
console.log(temperature.getUnit() === TemperatureUnitEnum.F);

console.log(Object.getPrototypeOf(temperature));

console.log("-------------------------");

console.log("Precipitation");

let precipitation = new Precipitation(
  new Date(2015, 6, 5),
  "Prague",
  TypesEnum.PRECIPITATION,
  PrecipitationUnitEnum.MM,
  5,
  "rain"
);

console.log(precipitation.getValue() === 5);
console.log(precipitation.getUnit() === PrecipitationUnitEnum.MM);

precipitation.convertToInches();

console.log(precipitation.getUnit() === PrecipitationUnitEnum.INCHES);

precipitation.convertToMM();
console.log(precipitation.getValue() === 5);
console.log(precipitation.getUnit() === PrecipitationUnitEnum.MM);

console.log("-------------------------");

console.log("Wind");

let wind = new Wind(
  new Date(2019, 5, 5),
  "Prague",
  TypesEnum.US,
  WindUnitEnum.MPH,
  2,
  "West"
);

console.log(wind.getValue() === 2);
console.log(wind.getUnit() === WindUnitEnum.MPH);

wind.convertToMS();

console.log(wind.getUnit() === WindUnitEnum.MS);

wind.convertToMPH();
console.log(wind.getValue() === 2);
console.log(wind.getUnit() === WindUnitEnum.MPH);

console.log("-------------------------");

const weathers = [temperature, precipitation, wind];
const weatherHistory = new WeatherHistory(weathers);
weatherHistory.setTypeFilter(TypesEnum.PRECIPITATION);
weatherHistory.setPlaceFilter("Prague");
weatherHistory.setPeriodFilter(
  new DateInterval(new Date(2010, 5, 5), Date.now())
);
console.log(weatherHistory.getFilteredData().length === 1);

console.log("-------------------------------------------------");
