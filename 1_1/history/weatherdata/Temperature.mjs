import { TemperatureUnitEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

function Temperature(time, place, type, unit, value) {
  const weatherData = WeatherData(time, place, type, unit, value);

  function convertToF() {
    if (weatherData.getUnit() === TemperatureUnitEnum.C) {
      weatherData.setUnit(TemperatureUnitEnum.F);
      let newValue = weatherData.getValue() * (9 / 5) + 32;
      weatherData.setValue(newValue);
    }
  }
  function convertToC() {
    if (weatherData.getUnit() === TemperatureUnitEnum.F) {
      weatherData.setUnit(TemperatureUnitEnum.C);
      let newValue = (weatherData.getValue() - 32) * (5 / 9);
      weatherData.setValue(newValue);
    }
  }
  
  return Object.assign({ convertToF, convertToC }, weatherData);
}

export default Temperature;
