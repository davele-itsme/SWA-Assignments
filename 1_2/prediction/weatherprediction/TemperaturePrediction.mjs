import { TemperatureUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function TemperaturePrediction(time, place, unit, max, min) {
  WeatherPrediction.call(
    this,
    time,
    place,
    TypesEnum.TEMPERATURE,
    unit,
    max,
    min
  );
  this.convertToF = () => {
    if (this.unit === TemperatureUnitEnum.C) {
      this.unit = TemperatureUnitEnum.F;
      this.max = this.max * (9 / 5) + 32;
      this.min = this.min * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.unit === TemperatureUnitEnum.F) {
      this.unit = TemperatureUnitEnum.C;
      this.max = (this.max - 32) * (5 / 9);
      this.min = (this.min - 32) * (5 / 9);
    }
  };
}
Object.setPrototypeOf(
  TemperaturePrediction.prototype,
  WeatherPrediction.prototype
);

export default TemperaturePrediction;
