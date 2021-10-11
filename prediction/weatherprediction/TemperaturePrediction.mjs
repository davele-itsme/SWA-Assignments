import { TypesEnum, TemperatureUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, type, unit, max, min) {
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  function convertToF() {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(TemperatureUnitEnum.F);
      let newValue = weatherPrediction.getValue() * (9 / 5) + 32;
      weatherPrediction.setValue(newValue);
    }
  }
  function convertToC() {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(TemperatureUnitEnum.C);
      let newValue = (weatherPrediction.getValue() - 32) * (5 / 9);
      weatherPrediction.setValue(newValue);
    }
  }
  return Object.assign({ convertToF, convertToC }, weatherPrediction);
}

export { TemperaturePrediction };
