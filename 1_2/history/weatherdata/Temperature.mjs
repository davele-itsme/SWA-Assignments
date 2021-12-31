import { TemperatureUnitEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);

  this.convertToF = () => {
    if (this.unit == TemperatureUnitEnum.C) {
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
Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype);

export default Temperature;
