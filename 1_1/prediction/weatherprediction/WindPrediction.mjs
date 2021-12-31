import { WindUnitEnum } from "./../../common/Enums.mjs";
import WeatherPrediction from "./WeatherPrediction.mjs";

function WindPrediction(time, place, type, unit, max, min, expectedDirections) {
  const state = { expectedDirections };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

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
      let newValue = weatherPrediction.getValue() * 2.237;
      weatherPrediction.setValue(newValue);
    }
  }

  function convertToMS() {
    if (weatherPrediction.getUnit() === WindUnitEnum.MPH) {
      weatherPrediction.setUnit(WindUnitEnum.MS);
      let newValue = weatherPrediction.getValue() / 2.237;
      weatherPrediction.setValue(newValue);
    }
  }

  return Object.assign(
    { getExpectedDirections, matches, convertToMPH, convertToMS },
    weatherPrediction
  );
}

export default WindPrediction;
