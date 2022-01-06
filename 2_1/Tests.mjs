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
import EventData from "./common/EventData.mjs";

//TESTING

var temperature = new Temperature(
  new Date(2015, 6, 5),
  "Prague",
  TemperatureUnitEnum.F,
  15
);

console.log(temperature.getValue() + " " + temperature.getUnit());

let cTemperature = temperature.convertToC();

console.log(temperature.getValue() + " " + temperature.getUnit());
console.log(cTemperature.getValue() + " " + cTemperature.getUnit());

let fTemperature = cTemperature.convertToF();

console.log(cTemperature.getValue() + " " + cTemperature.getUnit());
console.log(fTemperature.getValue() + " " + fTemperature.getUnit());

console.log("-------------------------");

var precipitation = new Precipitation(
  new Date(2016, 5, 5),
  "London",
  PrecipitationUnitEnum.INCHES,
  15,
  "rain"
);

console.log(precipitation.getValue() + " " + precipitation.getUnit());

let mmPrecipitation = precipitation.convertToMM();

console.log(precipitation.getValue() + " " + precipitation.getUnit());
console.log(mmPrecipitation.getValue() + " " + mmPrecipitation.getUnit());

let inchesPrecipitation = mmPrecipitation.convertToInches();

console.log(mmPrecipitation.getValue() + " " + mmPrecipitation.getUnit());
console.log(
  inchesPrecipitation.getValue() + " " + inchesPrecipitation.getUnit()
);

console.log("-------------------------");

var wind = new Wind(
  new Date(2019, 5, 5),
  "Copenhagen",
  WindUnitEnum.MPH,
  11,
  "west"
);

console.log(wind.getValue() + " " + wind.getUnit());

let msWind = wind.convertToMS();

console.log(wind.getValue() + " " + wind.getUnit());
console.log(msWind.getValue() + " " + msWind.getUnit());

let mphWind = msWind.convertToMPH();

console.log(msWind.getValue() + " " + msWind.getUnit());
console.log(mphWind.getValue() + " " + mphWind.getUnit());

console.log("-------------------------");

const weathers = [temperature, precipitation, wind];
const weathers2 = [temperature];
const weatherHistory = new WeatherHistory(weathers);

const newWeatherHistory = weatherHistory.including(weathers2);
console.log(newWeatherHistory.getData().length === 4);

const copenhagenWeatherHistory = weatherHistory.forPlace("Copenhagen");
console.log(copenhagenWeatherHistory.getData().length === 1);

console.log(weatherHistory.lowestValue());
console.log(weatherHistory.highestValue());

console.log("-------------------------");

//Immutability

const eventData = new EventData(
  new Date(2016, 1),
  "London",
  TypesEnum.TEMPERATURE,
  TemperatureUnitEnum.C
);
console.log(eventData.getType());
console.log(eventData.nonexisting === undefined);
try {
  eventData.time = "hello";
} catch (error) {
  console.log("Assigning property failed as expected.");
}
