import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

class Wind extends WeatherData {
  constructor(time, place, unit, value, direction) {
    super(time, place, TypesEnum.WIND, unit, value);
    this._direction = direction;
    if (this.constructor === Wind) {
      Object.freeze(this);
    }
  }

  getDirection() {
    this.direction;
  }
  convertToMPH() {
    if (this.unit === WindUnitEnum.MS) {
      return new Wind(
        this.time,
        this.place,
        WindUnitEnum.MPH,
        this.value * 2.237,
        this.direction
      );
    }
  }
  convertToMS() {
    if (this.unit === WindUnitEnum.MPH) {
      return new Wind(
        this.time,
        this.place,
        WindUnitEnum.MS,
        this.value / 2.237,
        this.direction
      );
    }
  }
}

export default Wind;
