import { PrecipitationUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

class Precipitation extends WeatherData {
  constructor(time, place, unit, value, precipitationType) {
    super(time, place, TypesEnum.PRECIPITATION, unit, value);
    this.precipitationType = precipitationType;
    if (this.constructor === Precipitation) {
      Object.freeze(this);
    }
  }

  getPrecipitationType() {
    return this.precipitationType;
  }
  convertToInches() {
    if (this.unit === PrecipitationUnitEnum.MM) {
      return new Precipitation(
        this.time,
        this.place,
        PrecipitationUnitEnum.INCHES,
        this.value / 25.4,
        this.precipitationType
      );
    }
  }
  convertToMM() {
    if (this.unit === PrecipitationUnitEnum.INCHES) {
      return new Precipitation(
        this.time,
        this.place,
        PrecipitationUnitEnum.MM,
        this.value * 25.4,
        this.precipitationType
      );
    }
  }
}

export default Precipitation;
