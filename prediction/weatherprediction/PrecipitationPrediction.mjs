import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

class PrecipitationPrediction extends WeatherPrediction {
  constructor(time, place, type, unit, expectedTypes) {
    super(time, place, type, unit);
    this.expectedTypes = expectedTypes;
    Object.freeze(this);
  }

  getExpectedTypes() {
    [...this.expectedTypes];
  }
  matches(data) {}
  convertToInches() {
    if (this.type == TypesEnum.International) {
      return new Precipitation(
        this.time,
        this.place,
        TypesEnum.US,
        PrecipitationUnitEnum.INCHES,
        this.value / 25.4,
        this.precipitationType
      );
    }
  }
  convertToMM() {
    if (this.type == TypesEnum.US) {
      return new Precipitation(
        this.getTime(),
        this.getPlace(),
        TypesEnum.International,
        PrecipitationUnitEnum.MM,
        this.getValue() * 25.4,
        this.getPrecipitationType()
      );
    }
  }
}

export { PrecipitationPrediction };
