import { PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationType = precipitationType;

  this.getPrecipitationType = () => this.precipitationType;
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

Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype);

export default Precipitation;
