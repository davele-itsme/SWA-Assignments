import { TypesEnum, TemperatureUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

class TemperaturePrediction extends WeatherPrediction {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
    if (this.constructor === TemperaturePrediction) {
      Object.freeze(this);
    }
  }
  convertToF() {
    if (this.type == TypesEnum.International) {
      return new Temperature(
        this.time,
        this.place,
        TypesEnum.US,
        TemperatureUnitEnum.F,
        this.value * (9 / 5) + 32
      );
    }
  }
  convertToC() {
    if (this.type == TypesEnum.US) {
      return new Temperature(
        this.time,
        this.place,
        TypesEnum.International,
        TemperatureUnitEnum.C,
        (this.value - 32) * (5 / 9)
      );
    }
  }
}

export { TemperaturePrediction };
