import { PrecipitationUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function PrecipitationPrediction(time, place, unit, expectedTypes) {
  WeatherPrediction.call(this, time, place, TypesEnum.PRECIPITATION, unit);
  this.expectedTypes = expectedTypes;

  this.getExpectedTypes = () => this.expectedTypes;
  this.matches = (data) => {};
  this.convertToInches = () => {
    if (this.unit === PrecipitationUnitEnum.MM) {
      this.unit = PrecipitationUnitEnum.INCHES;
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.unit === PrecipitationUnitEnum.INCHES) {
      this.unit = PrecipitationUnitEnum.MM;
      this.value = this.value * 25.4;
    }
  };
}
Object.setPrototypeOf(
  PrecipitationPrediction.prototype,
  WeatherPrediction.prototype
);

export default PrecipitationPrediction;
