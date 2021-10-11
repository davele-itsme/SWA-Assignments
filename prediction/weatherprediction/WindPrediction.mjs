import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import { WeatherPrediction } from "./WeatherPrediction.mjs";

function WindPrediction(time, place, type, unit, max, min, expectedDirections) {
  const state = { expectedDirections };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  function getExpectedDirections() {
    state.expectedDirections;
  }
  function matches(data) {}
  function convertToMPH() {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(WindUnitEnum.MPH);
      let newValue = weatherPrediction.getValue() * 2.237;
      weatherPrediction.setValue(newValue);
    }
  }

  function convertToMS() {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(WindUnitEnum.MS);
      let newValue = weatherPrediction.getValue() / 2.237;
      weatherPrediction.setValue(newValue);
    }
  }

  return Object.assign(
    { getExpectedDirections, matches, convertToMPH, convertToMS },
    weatherPrediction
  );
}

export { WindPrediction };
