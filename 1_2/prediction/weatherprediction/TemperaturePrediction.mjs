import { TemperatureUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, unit, value) {
  WeatherPrediction.call(this, time, place, TypesEnum.TEMPERATURE, unit, value);
  this.convertToF = () => {
    if (this.unit === TemperatureUnitEnum.C) {
      this.unit = TemperatureUnitEnum.F;
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.unit === TemperatureUnitEnum.F) {
      this.unit = TemperatureUnitEnum.C;
      this.value = (this.value - 32) * (5 / 9);
    }
  };
}
Object.setPrototypeOf(
  TemperaturePrediction.prototype,
  WeatherPrediction.prototype
);

export default TemperaturePrediction;
