import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

class Wind extends WeatherData {
  constructor(time, place, type, unit, value, direction) {
    super(time, place, type, unit, value);
    this.direction = direction;
    Object.freeze(this);
  }

  getDirection() {
    this.direction;
  }
  convertToMPH() {
    if (this.type == TypesEnum.International) {
      return new Wind(
        this.time,
        this.place,
        TypesEnum.US,
        WindUnitEnum.MPH,
        this.value * 2.237,
        this.direction
      );
    }
  }
  convertToMS() {
    if (this.type == TypesEnum.US) {
      return new Wind(
        this.time,
        this.place,
        TypesEnum.International,
        WindUnitEnum.MS,
        this.value / 2.237,
        this.direction
      );
    }
  }
}

export { Wind };
