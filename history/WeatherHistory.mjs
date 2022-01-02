import { TypesEnum } from "../common/Enums.mjs";

class WeatherHistory {
  constructor(data) {
    this.data = data;
    if (this.constructor === WeatherHistory) {
      Object.freeze(this);
    }
  }

  forPlace(place) {
    return new WeatherHistory(
      this.data.filter((weatherData) => weatherData.getPlace() === place)
    );
  }

  forType(type) {
    return new WeatherHistory(
      this.data.filter((weatherData) => weatherData.getType() === type)
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
        switch (weatherData.getType()) {
          case TypesEnum.TEMPERATURE:
            return weatherData.convertToC();
          case TypesEnum.PRECIPITATION:
            return weatherData.convertToMM();
          case TypesEnum.WIND:
            return weatherData.convertToMS();
        }
      })
    );
  }

  convertToUSUnits() {
    return new WeatherHistory(
      this.data.map((weatherData) => {
        switch (weatherData.getType()) {
          case TypesEnum.TEMPERATURE:
            return weatherData.convertToF();
          case TypesEnum.PRECIPITATION:
            return weatherData.convertToInches();
          case TypesEnum.WIND:
            return weatherData.convertToMPH();
        }
      })
    );
  }

  including(data) {
    return new WeatherHistory([...this.data, ...data]);
  }

  lowestValue() {
    if (this.data.size === 0) {
      return undefined;
    }
    return this.data.reduce(
      (acc, val) => (acc < val.getValue() ? acc : val.getValue()),
      this.data[0].getValue()
    );
  }

  highestValue() {
    if (this.data.size === 0) {
      return undefined;
    }
    return this.data.reduce(
      (acc, val) => (acc > val.getValue() ? acc : val.getValue()),
      this.data[0].getValue()
    );
  }

  getData() {
    return this.data;
  }
}

export default WeatherHistory;
