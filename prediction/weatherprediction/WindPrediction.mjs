import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

class WindPrediction extends WeatherPrediction {
  constructor(time, place, type, unit, value, expectedDirections) {
    super(time, place, type, unit, value);
    this.expectedDirections = expectedDirections;
    Object.freeze(this);
  }

  getExpectedDirections() {
    return [...this.expectedDirections];
  }
  matches(data) {}
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

export { WindPrediction };
