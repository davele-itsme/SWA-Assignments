class WeatherForecast {
  constructor(data) {
    this.data = data;
    Object.freeze(this);
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

  convertToUSUnits() {
    const data = this.data.map((weatherData) => weatherData);
    console.log(data);
    for (const x of data) {
      x.convertToF();
    }
    return new WeatherForecast(data);
  }

  convertToInternationalUnits() {
    return new WeatherForecast(
      this.data.map((weatherData) => {
        weatherData.convertToC();
        return weatherData;
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
    [...this.data];
  }
}

export { WeatherForecast };
