import { Precipitation } from "./weatherdata/Precipitation.mjs";
import { Temperature } from "./weatherdata/Temperature.mjs";
import { Wind } from "./weatherdata/Wind.mjs";

class WeatherHistory {
  constructor(data) {
    this.data = data;
    if (this.constructor === WeatherHistory) {
      Object.freeze(this);
    }
  }

  forPlace(place) {
    return new WeatherHistory(
      this.data.filter((weatherData) => weatherData.getPlace() == place)
    );
  }

  forType(type) {
    return new WeatherHistory(
      this.data.filter((weatherData) => weatherData.getType() == type)
    );
  }

  forPeriod(period) {
    return new WeatherHistory(
      this.data.filter((weatherData) => period.contains(weatherData.getTime()))
    );
  }

  convertToInternationalUnits() {
    return new WeatherHistory(
      this.data.map((weatherData) => {
        switch (true) {
          case weatherData instanceof Temperature:
            return weatherData.convertToC();
          case weatherData instanceof Precipitation:
            return weatherData.convertToMM();
          case weatherData instanceof Wind:
            return weatherData.convertToMS();
        }
      })
    );
  }

  convertToUSUnits() {
    return new WeatherHistory(
      this.data.map((weatherData) => {
        switch (true) {
          case weatherData instanceof Temperature:
            return weatherData.convertToF();
          case weatherData instanceof Precipitation:
            return weatherData.convertToInches();
          case weatherData instanceof Wind:
            return weatherData.convertToMPH();
        }
      })
    );
  }

  including(data) {
    return new WeatherHistory([...this.data, ...data]);
  }

  lowestValue() {
    if (
      new Set(this.data.map((x) => x.getType())).size !== 1 ||
      this.data.size === 0
    ) {
      return undefined;
    }
    return this.data.reduce(
      (acc, val) => (acc < val.getValue() ? acc : val.getValue()),
      this.data[0].getValue()
    );
  }

  highestValue() {
    if (
      new Set(this.data.map((x) => x.getType())).size !== 1 ||
      this.data.size === 0
    ) {
      return undefined;
    }
    return this.data.reduce(
      (acc, val) => (acc > val.getValue() ? acc : val.getValue()),
      this.data[0].getValue()
    );
  }

  getData() {
    return [...this.data];
  }
}

export { WeatherHistory };
