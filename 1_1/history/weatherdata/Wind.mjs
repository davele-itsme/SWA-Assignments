import { TypesEnum, WindUnitEnum } from "./../../common/Enums.mjs";
import { WeatherData } from "./WeatherData.mjs";

function Wind(time, place, type, unit, value, direction) {
  const state = { direction };
  let weatherData = WeatherData(time, place, type, unit, value);

  function getDirection() {
    return state.direction;
  }
  function convertToMPH() {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(WindUnitEnum.MPH);
      let newValue = weatherData.getValue() * 2.237;
      weatherData.setValue(newValue);
    }
  }

  function convertToMS() {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(WindUnitEnum.MS);
      let newValue = weatherData.getValue() / 2.237;
      weatherData.setValue(newValue);
    }
  }

  return Object.assign(
    { getDirection, convertToMPH, convertToMS },
    weatherData
  );
}

export { Wind };
