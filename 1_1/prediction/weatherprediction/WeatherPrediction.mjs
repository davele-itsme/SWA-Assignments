import Event from "../../common/Event.mjs";
import DataType from "./../../common/DataType.mjs";

function WeatherPrediction(time, place, type, unit, max, min) {
  const state = { max, min };
  let event = Event(time, place);
  let dataType = DataType(type, unit);

  function matches(data) {
    return (
      data.getTime() === event.getTime() &&
      data.getPlace() === event.getPlace() &&
      data.getType() === dataType.getType() &&
      data.getUnit() === dataType.getUnit() &&
      data.getValue() <= state.max &&
      data.getValue() >= state.min
    );
  }
  function getMax() {
    return state.max;
  }
  function getMin() {
    return state.min;
  }
  function setMax(max) {
    state.max = max;
  }
  function setMin(min) {
    state.min = min;
  }

  return Object.assign(
    { matches, getMax, getMin, setMax, setMin },
    event,
    dataType
  );
}

export default WeatherPrediction;
