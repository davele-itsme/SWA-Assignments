import { EventData } from "../../common/EventData.mjs";

class WeatherPrediction extends EventData {
  constructor(time, place, type, unit, max, min) {
    super(time, place, type, unit);
    this.max = max;
    this.min = min;
    Object.freeze(this);
  }

  matches(data) {
    return (
      data.time == this.time &&
      data.place == this.place &&
      data.type == this.type &&
      data.unit == this.unit &&
      data.value < this.max &&
      data.value > this.min
    );
  }
  getMax() {
    return this.max;
  }
  getMin() {
    return this.min;
  }
}

export { WeatherPrediction };
