import { PrecipitationUnitEnum, TypesEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function PrecipitationPrediction(
  time,
  place,
  unit,
  max,
  min,
  expectedTypes
) {
  const state = { expectedTypes };
  let weatherPrediction = WeatherPrediction(time, place, TypesEnum.PRECIPITATION, unit, max, min);

  function getExpectedTypes() {
    state.expectedTypes;
  }
  function matches(data) {
    return (
      data.getTime() === weatherPrediction.getTime() &&
      data.getPlace() === weatherPrediction.getPlace() &&
      data.getType() === weatherPrediction.getType() &&
      data.getUnit() === weatherPrediction.getUnit() &&
      data.getValue() <= weatherPrediction.getMax() &&
      data.getValue() >= weatherPrediction.getMin() &&
      state.expectedTypes.includes(data.getPrecipitationType())
    );
  }
  function convertToInches() {
    if (weatherPrediction.getUnit() === PrecipitationUnitEnum.MM) {
      weatherPrediction.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherPrediction.getValue() / 25.4;
      weatherPrediction.setValue(newValue);
    }
  }
  function convertToMM() {
    if (weatherPrediction.getUnit() === PrecipitationUnitEnum.INCHES) {
      weatherPrediction.setUnit(PrecipitationUnitEnum.MM);
      let newValue = weatherPrediction.getValue() * 25.4;
      weatherPrediction.setValue(newValue);
    }
  }
  return Object.assign(
    { getExpectedTypes, matches, convertToInches, convertToMM },
    weatherPrediction
  );
}

export default PrecipitationPrediction;
