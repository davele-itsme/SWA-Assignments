import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

function PrecipitationPrediction(time, place, type, unit, expectedTypes) {
  WeatherPrediction.call(this, time, place, type, unit);
  this.expectedTypes = expectedTypes;

  this.getExpectedTypes = () => this.expectedTypes;
  this.matches = (data) => {};
  this.convertToInches = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = PrecipitationUnitEnum.INCHES;
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = PrecipitationUnitEnum.MM;
      this.value = this.value * 25.4;
    }
  };
}
Object.setPrototypeOf(
  PrecipitationPrediction.prototype,
  WeatherPrediction.prototype
);

export { PrecipitationPrediction };
