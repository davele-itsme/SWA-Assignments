import { EventClass } from "./../../common/EventClass.mjs";
import { DataType } from "./../../common/DataType.mjs";

function WeatherData(time, place, type, unit, value) {
  EventClass.call(this, time, place);
  DataType.call(this, type, unit);
  this.value = value;

  this.getValue = () => this.value;
}
WeatherData.prototype = Object.assign(
  {},
  EventClass.prototype,
  DataType.prototype
);
WeatherData.prototype.constructor = WeatherData;

export { WeatherData };
