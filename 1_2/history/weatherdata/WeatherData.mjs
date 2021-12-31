import Event from "../../common/Event.mjs";
import DataType from "./../../common/DataType.mjs";

function WeatherData(time, place, type, unit, value) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.value = value;

  this.getValue = () => this.value;
}
WeatherData.prototype = Object.assign({}, Event.prototype, DataType.prototype);
WeatherData.prototype.constructor = WeatherData;

export default WeatherData;
