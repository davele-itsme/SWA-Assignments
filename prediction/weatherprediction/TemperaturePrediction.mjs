import { TemperatureUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, unit, max, min) {
    super(time, place, TypesEnum.TEMPERATURE, unit, max, min);
    if (this.constructor === TemperaturePrediction) {
      Object.freeze(this);
    }
  }
  convertToF() {
    if (this.unit === TemperatureUnitEnum.C) {
      return new Temperature(
        this.time,
        this.place,
        TemperatureUnitEnum.F,
        this.max * (9 / 5) + 32,
        this.min * (9 / 5) + 32
      );
    }
  }
  convertToC() {
    if (this.unit === TemperatureUnitEnum.F) {
      return new Temperature(
        this.time,
        this.place,
        TemperatureUnitEnum.C,
        (this.max - 32) * (5 / 9),
        (this.min - 32) * (5 / 9)
      );
    }
  }
}

export default TemperaturePrediction;
