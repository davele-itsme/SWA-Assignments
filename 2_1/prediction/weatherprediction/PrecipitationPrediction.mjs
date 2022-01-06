import { PrecipitationUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

class PrecipitationPrediction extends WeatherPrediction {
  constructor(time, place, unit, max, min, expectedTypes) {
    super(time, place, TypesEnum.PRECIPITATION, unit, max, min);
    this.expectedTypes = expectedTypes;
    if (this.constructor === PrecipitationPrediction) {
      Object.freeze(this);
    }
  }

  getExpectedTypes() {
    this.expectedTypes;
  }
  matches(data) {
    return (
      data.getTime() === this.time &&
      data.getPlace() === this.place &&
      data.getType() === this.type &&
      data.getUnit() === this.unit &&
      data.getValue() <= this.max &&
      data.getValue() >= this.min &&
      this.expectedTypes.includes(data.getPrecipitationType())
    );
  }
  convertToInches() {
    if (this.unit === PrecipitationUnitEnum.MM) {
      return new PrecipitationPrediction(
        this.time,
        this.place,
        PrecipitationUnitEnum.INCHES,
        this.max / 25.4,
        this.min / 25.4,
        this.expectedTypes
      );
    }
  }
  convertToMM() {
    if (this.unit === PrecipitationUnitEnum.INCHES) {
      return new PrecipitationPrediction(
        this.getTime(),
        this.getPlace(),
        PrecipitationUnitEnum.MM,
        this.max * 25.4,
        this.min * 25.4,
        this.expectedTypes
      );
    }
  }
}

export { PrecipitationPrediction };
