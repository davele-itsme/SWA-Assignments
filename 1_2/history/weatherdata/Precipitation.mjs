import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationType = precipitationType;

  this.getPrecipitationType = () => this.precipitationType;
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
Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype);

export { Precipitation };
