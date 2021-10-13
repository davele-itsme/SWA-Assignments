import { EventData } from "../../common/EventData.mjs";

class WeatherData extends EventData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit);
    this.value = value;
    Object.freeze(this);
  }

  getValue() {
    return this.value;
  }
}

export { WeatherData };
