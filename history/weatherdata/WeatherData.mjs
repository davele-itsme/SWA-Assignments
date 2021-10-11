import { EventClass } from "./../../common/EventClass.mjs";
import { DataType } from "./../../common/DataType.mjs";

function WeatherData(time, place, type, unit, value) {
  const state = { value };
  let eventClass = EventClass(time, place);
  let dataType = DataType(type, unit);
  function getValue() {
    return state.value;
  }
  function setValue(value) {
    state.value = value;
  }
  return Object.assign({ getValue, setValue }, eventClass, dataType);
}

export { WeatherData };
