import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function WindPrediction(time, place, unit, max, min, expectedDirections) {
  const state = { expectedDirections };
  let weatherPrediction = WeatherPrediction(
    time,
    place,
    TypesEnum.WIND,
    unit,
    max,
    min
  );

  function getExpectedDirections() {
    state.expectedDirections;
  }
  function matches(data) {
    return (
      data.getTime() === weatherPrediction.getTime() &&
      data.getPlace() === weatherPrediction.getPlace() &&
      data.getType() === weatherPrediction.getType() &&
      data.getUnit() === weatherPrediction.getUnit() &&
      data.getValue() <= weatherPrediction.getMax() &&
      data.getValue() >= weatherPrediction.getMin() &&
      state.expectedDirections.includes(data.getDirection())
    );
  }
  function convertToMPH() {
    if (weatherPrediction.getUnit() === WindUnitEnum.MS) {
      weatherPrediction.setUnit(WindUnitEnum.MPH);
      weatherPrediction.setMax(weatherPrediction.getMax() * 2.237);
      weatherPrediction.setMin(weatherPrediction.getMin() * 2.237);
    }
  }

  function convertToMS() {
    if (weatherPrediction.getUnit() === WindUnitEnum.MPH) {
      weatherPrediction.setUnit(WindUnitEnum.MS);
      weatherPrediction.setMax(weatherPrediction.getMax() / 2.237);
      weatherPrediction.setMin(weatherPrediction.getMin() / 2.237);
    }
  }

  return Object.assign(
    { getExpectedDirections, matches, convertToMPH, convertToMS },
    weatherPrediction
  );
}

export default WindPrediction;
