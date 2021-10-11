import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

function Wind(time, place, type, unit, value, direction) {
  WeatherData.call(this, time, place, type, unit, value);
  this.direction = direction;

  this.getDirection = () => this.direction;
  this.convertToMPH = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = WindUnitEnum.MPH;
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = WindUnitEnum.MS;
      this.value = this.value / 2.237;
    }
  };
}
Object.setPrototypeOf(Wind.prototype, WeatherData.prototype);

export { Wind };
