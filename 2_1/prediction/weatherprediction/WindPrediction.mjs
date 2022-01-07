import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

class WindPrediction extends WeatherPrediction {
  constructor(time, place, unit, value, expectedDirections) {
    super(time, place, TypesEnum.WIND, unit, value);
    this.expectedDirections = expectedDirections;
    if (this.constructor === WindPrediction) {
      Object.freeze(this);
    }
  }

  getExpectedDirections() {
    return this.expectedDirections;
  }
  matches(data) {
    return (
      data.getTime() === this.time &&
      data.getPlace() === this.place &&
      data.getType() === this.type &&
      data.getUnit() === this.unit &&
      data.getValue() <= this.max &&
      data.getValue() >= this.min &&
      this.expectedDirections.includes(data.getDirection())
    );
  }
  convertToMPH() {
    if (this.unit === WindUnitEnum.MS) {
      return new Wind(
        this.time,
        this.place,
        WindUnitEnum.MPH,
        this.max * 2.237,
        this.min * 2.237,
        this.expectedDirections
      );
    }
  }
  convertToMS() {
    if (this.unit === WindUnitEnum.MPH) {
      return new Wind(
        this.time,
        this.place,
        WindUnitEnum.MS,
        this.max / 2.237,
        this.min / 2.237,
        this.expectedDirections
      );
    }
  }
}

export default WindPrediction;
