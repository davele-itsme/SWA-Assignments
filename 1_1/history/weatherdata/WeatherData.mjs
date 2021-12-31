import Event from "../../common/Event.mjs";
import DataType from "./../../common/DataType.mjs";

function WeatherData(time, place, type, unit, value) {
  const state = { value };
  const event = Event(time, place);
  const dataType = DataType(type, unit);

  function getValue() {
    return state.value;
  }
  function setValue(value) {
    state.value = value;
  }

  return Object.assign({ getValue, setValue }, event, dataType);
}

export default WeatherData;
