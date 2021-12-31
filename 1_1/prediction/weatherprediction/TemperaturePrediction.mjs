import { TemperatureUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, type, unit, max, min) {
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  function convertToF() {
    if (weatherPrediction.getUnit() === TemperatureUnitEnum.C) {
      weatherPrediction.setUnit(TemperatureUnitEnum.F);
      let newValue = weatherPrediction.getValue() * (9 / 5) + 32;
      weatherPrediction.setValue(newValue);
    }
  }
  function convertToC() {
    if (weatherPrediction.getUnit() === TemperatureUnitEnum.F) {
      weatherPrediction.setUnit(TemperatureUnitEnum.C);
      let newValue = (weatherPrediction.getValue() - 32) * (5 / 9);
      weatherPrediction.setValue(newValue);
    }
  }
  return Object.assign({ convertToF, convertToC }, weatherPrediction);
}

export default TemperaturePrediction;
