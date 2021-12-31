import { WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function WindPrediction(time, place, type, unit, value, expectedDirections) {
  WeatherPrediction.call(this, time, place, type, unit, value);
  this.expectedDirections = expectedDirections;

  this.getExpectedDirections = () => this.expectedDirections;
  this.matches = (data) => {};
  this.convertToMPH = () => {
    if (this.unit === WindUnitEnum.MS) {
      this.unit = WindUnitEnum.MPH;
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.unit === WindUnitEnum.MPH) {
      this.unit = WindUnitEnum.MS;
      this.value = this.value / 2.237;
    }
  };
}
Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction.prototype);

export default WindPrediction;
