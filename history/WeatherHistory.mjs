class WeatherHistory {
  constructor(data) {
    this.data = data;
    Object.freeze(this);
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

  convertToUSUnits() {
    const data = this.data.map((weatherData) => weatherData);
    console.log(data);
    for (const x of data) {
      x.convertToF();
    }
    return new WeatherHistory(data);
  }

  convertToInternationalUnits() {
    return new WeatherHistory(
      this.data.map((weatherData) => {
        weatherData.convertToC();
        return weatherData;
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
