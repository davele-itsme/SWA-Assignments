import { PrecipitationUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function PrecipitationPrediction(time, place, unit, max, min, expectedTypes) {
  WeatherPrediction.call(
    this,
    time,
    place,
    TypesEnum.PRECIPITATION,
    unit,
    max,
    min
  );
  this.expectedTypes = expectedTypes;

  this.getExpectedTypes = () => this.expectedTypes;
  this.matches = (data) => {
    return (
      data.getTime() === this.time &&
      data.getPlace() === this.place &&
      data.getType() === this.type &&
      data.getUnit() === this.unit &&
      data.getValue() <= this.max &&
      data.getValue() >= this.min &&
      this.expectedTypes.includes(data.getPrecipitationType())
    );
  };
  this.convertToInches = () => {
    if (this.unit === PrecipitationUnitEnum.MM) {
      this.unit = PrecipitationUnitEnum.INCHES;
      this.max = this.max / 25.4;
      this.min = this.min / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.unit === PrecipitationUnitEnum.INCHES) {
      this.unit = PrecipitationUnitEnum.MM;
      this.max = this.max * 25.4;
      this.min = this.min * 25.4;
    }
  };
}
Object.setPrototypeOf(
  PrecipitationPrediction.prototype,
  WeatherPrediction.prototype
);

export default PrecipitationPrediction;
