import { PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import WeatherData from "./WeatherData.mjs";

function Precipitation(time, place, type, unit, value, precipitationType) {
  const state = { precipitationType };
  const weatherData = WeatherData(time, place, type, unit, value);

  function getPrecipitationType() {
    return state.precipitationType;
  }
  function convertToInches() {
    if (weatherData.getUnit() === PrecipitationUnitEnum.MM) {
      weatherData.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherData.getValue() / 25.4;
      weatherData.setValue(newValue);
    }
  }
  function convertToMM() {
    if (weatherData.getUnit() === PrecipitationUnitEnum.INCHES) {
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

export default Precipitation;
