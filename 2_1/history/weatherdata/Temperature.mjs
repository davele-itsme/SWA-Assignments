import { TemperatureUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

class Temperature extends WeatherData {
  constructor(time, place, unit, value) {
    super(time, place, TypesEnum.TEMPERATURE, unit, value);
    if (this.constructor === Temperature) {
      Object.freeze(this);
    }
  }

  convertToF() {
    if (this.unit === TemperatureUnitEnum.C) {
      return new Temperature(
        this.time,
        this.place,
        TemperatureUnitEnum.F,
        this.value * (9 / 5) + 32
      );
    }
  }
  convertToC() {
    if (this.unit === TemperatureUnitEnum.F) {
      return new Temperature(
        this.time,
        this.place,
        TemperatureUnitEnum.C,
        (this.value - 32) * (5 / 9)
      );
    }
  }
}

export default Temperature;
