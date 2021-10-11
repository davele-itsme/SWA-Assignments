import { EventClass } from "./../../common/EventClass.mjs";
import { DataType } from "./../../common/DataType.mjs";

function WeatherPrediction(time, place, type, unit, max, min) {
  const state = { max, min };
  let eventClass = EventClass(time, place);
  let dataType = DataType(type, unit);
  function matches(data) {
    return (
      data.time == eventClass.getTime() &&
      data.place == eventClass.getPlace() &&
      data.type == dataType.getType() &&
      data.unit == dataType.getUnit() &&
      data.value < state.max &&
      data.value > state.min
    );
  }
  function getMax() {
    state.max;
  }
  function getMin() {
    state.min;
  }

  return Object.assign({ matches, getMax, getMin }, eventClass, dataType);
}

export { WeatherPrediction };
