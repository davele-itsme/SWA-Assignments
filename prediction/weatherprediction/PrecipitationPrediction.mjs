import { TypesEnum, PrecipitationUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

function PrecipitationPrediction(
  time,
  place,
  type,
  unit,
  max,
  min,
  expectedTypes
) {
  const state = { expectedTypes };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  function getExpectedTypes() {
    state.expectedTypes;
  }
  function matches(data) {}
  function convertToInches() {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherPrediction.getValue() / 25.4;
      weatherPrediction.setValue(newValue);
    }
  }
  function convertToMM() {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(PrecipitationUnitEnum.MM);
      let newValue = weatherPrediction.getValue() * 25.4;
      weatherPrediction.setValue(newValue);
    }
  }
  return Object.assign(
    { getExpectedTypes, matches, convertToInches, convertToMM },
    weatherPrediction
  );
}

export { PrecipitationPrediction };
