import { TypesEnum } from "../common/Enums.mjs";

class WeatherForecast {
  constructor(data) {
    this.data = data;
    if (this.constructor === WeatherForecast) {
      Object.freeze(this);
    }
  }

  forPlace(place) {
    return new WeatherForecast(
      this.data.filter((weatherData) => weatherData.getPlace() == place)
    );
  }

  forType(type) {
    return new WeatherForecast(
      this.data.filter((weatherData) => weatherData.getType() == type)
    );
  }

  forPeriod(period) {
    return new WeatherForecast(
      this.data.filter((weatherData) => period.contains(weatherData.getTime()))
    );
  }

  including(data) {
    return new WeatherForecast([...this.data, ...data]);
  }

  convertToInternationalUnits() {
    return new WeatherForecast(
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
    return new WeatherForecast(
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

  getAverageMinValue() {
    if (
      new Set(this.data.map((x) => x.getType())).size !== 1 ||
      this.data.size === 0
    ) {
      return undefined;
    }
    return (
      this.data.reduce(
        (acc, val) => (acc < val.getMin() ? acc : val.getMin()),
        this.data[0].getMin()
      ) / this.data.size
    );
  }

  getAverageMaxValue() {
    if (
      new Set(this.data.map((x) => x.getType())).size !== 1 ||
      this.data.size === 0
    ) {
      return undefined;
    }
    return (
      this.data.reduce(
        (acc, val) => (acc > val.getMax() ? acc : val.getMax()),
        this.data[0].getMax()
      ) / this.data.size
    );
  }

  getPredictions() {
    return this.data;
  }
}

export default WeatherForecast;
