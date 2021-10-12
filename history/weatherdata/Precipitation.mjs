import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

function Precipitation(time, place, type, unit, value, precipitationType) {
  const state = { precipitationType };
  const weatherData = WeatherData(time, place, type, unit, value);
  Object.freeze(this);

  function getPrecipitationType() {
    return state.precipitationType;
  }
  function convertToInches() {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherData.getValue() / 25.4;
      weatherData.setValue(newValue);
    }
  }
  function convertToMM() {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(PrecipitationUnitEnum.MM);
      let newValue = weatherData.getValue() * 25.4;
      weatherData.setValue(newValue);
    }
  }
  return Object.assign(
    { getPrecipitationType, convertToInches, convertToMM },
    weatherData
  );
}

export { Precipitation };
