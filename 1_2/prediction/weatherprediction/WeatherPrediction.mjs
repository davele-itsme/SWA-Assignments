import Event from "../../common/Event.mjs";
import DataType from "./../../common/DataType.mjs";

function WeatherPrediction(time, place, type, unit, max, min) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.max = max;
  this.min = min;

  this.matches = (data) => {
    return (
      data.time === this.time &&
      data.place === this.place &&
      data.type === this.type &&
      data.unit === this.unit &&
      data.value <= this.max &&
      data.value >= this.min
    );
  };
  this.getMax = () => this.max;
  this.getMin = () => this.min;
}
WeatherPrediction.prototype = Object.assign(
  {},
  Event.prototype,
  DataType.prototype
);
WeatherPrediction.prototype.constructor = WeatherPrediction;

export default WeatherPrediction;
