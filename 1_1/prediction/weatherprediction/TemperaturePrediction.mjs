import { TemperatureUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, unit, max, min) {
  let weatherPrediction = WeatherPrediction(
    time,
    place,
    TypesEnum.TEMPERATURE,
    unit,
    max,
    min
  );

  function convertToF() {
    if (weatherPrediction.getUnit() === TemperatureUnitEnum.C) {
      weatherPrediction.setUnit(TemperatureUnitEnum.F);
      weatherPrediction.setMax(weatherPrediction.getMax() * (9 / 5) + 32);
      weatherPrediction.setMin(weatherPrediction.getMin() * (9 / 5) + 32);
    }
  }
  function convertToC() {
    if (weatherPrediction.getUnit() === TemperatureUnitEnum.F) {
      weatherPrediction.setUnit(TemperatureUnitEnum.C);
      weatherPrediction.setMax((weatherPrediction.getMax() - 32) * (5 / 9));
      weatherPrediction.setMin((weatherPrediction.getMin() - 32) * (5 / 9));
    }
  }
  return Object.assign({ convertToF, convertToC }, weatherPrediction);
}

export default TemperaturePrediction;
