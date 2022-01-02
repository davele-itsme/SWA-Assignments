import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function WindPrediction(time, place, unit, max, min, expectedDirections) {
  WeatherPrediction.call(this, time, place, TypesEnum.WIND, unit, max, min);
  this.expectedDirections = expectedDirections;

  this.getExpectedDirections = () => this.expectedDirections;
  this.matches = (data) => {
    return (
      data.getTime() === this.time &&
      data.getPlace() === this.place &&
      data.getType() === this.type &&
      data.getUnit() === this.unit &&
      data.getValue() <= this.max &&
      data.getValue() >= this.min &&
      this.expectedDirections.includes(data.getDirection())
    );
  };
  this.convertToMPH = () => {
    if (this.unit === WindUnitEnum.MS) {
      this.unit = WindUnitEnum.MPH;
      this.max = this.max * 2.237;
      this.min = this.min * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.unit === WindUnitEnum.MPH) {
      this.unit = WindUnitEnum.MS;
      this.max = this.max / 2.237;
      this.min = this.min / 2.237;
    }
  };
}
Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction.prototype);

export default WindPrediction;
