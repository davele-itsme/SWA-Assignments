import { TypesEnum, TemperatureUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, type, unit, value) {
  WeatherPrediction.call(this, time, place, type, unit, value);
  this.convertToF = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = TemperatureUnitEnum.F;
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = TemperatureUnitEnum.C;
      this.value = (this.value - 32) * (5 / 9);
    }
  };
}
Object.setPrototypeOf(
  TemperaturePrediction.prototype,
  WeatherPrediction.prototype
);

export { TemperaturePrediction };
