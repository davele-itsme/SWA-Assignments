import EventData from "../../common/EventData.mjs";

class WeatherPrediction extends EventData {
  constructor(time, place, type, unit, max, min) {
    super(time, place, type, unit);
    this.max = max;
    this.min = min;
    if (this.constructor === WeatherPrediction) {
      Object.freeze(this);
    }
  }

  matches(data) {
    return (
      data.getTime() === this.time &&
      data.getPlace() === this.place &&
      data.getType() === this.type &&
      data.getUnit() === this.unit &&
      data.getValue() <= this.max &&
      data.getValue() >= this.min
    );
  }
  getMax() {
    return this.max;
  }
  getMin() {
    return this.min;
  }
}

export default WeatherPrediction;
