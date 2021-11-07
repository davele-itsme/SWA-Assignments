import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

class Precipitation extends WeatherData {
  constructor(time, place, type, unit, value, precipitationType) {
    super(time, place, type, unit, value);
    this.precipitationType = precipitationType;
    if (this.constructor === Precipitation) {
      Object.freeze(this);
    }
  }

  getPrecipitationType() {
    return this.precipitationType;
  }
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

export { Precipitation };
