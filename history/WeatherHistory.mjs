function WeatherHistory(data) {
  const state = { data };

  function forPlace(place) {
    return WeatherHistory(
      state.data.filter((weatherData) => weatherData.getPlace() == place)
    );
  }

  function forType(type) {
    return WeatherHistory(
      state.data.filter((weatherData) => weatherData.getType() == type)
    );
  }

  function forPeriod(period) {
    return WeatherHistory(
      state.data.filter((weatherData) => period.contains(weatherData.getTime()))
    );
  }

  const mergeArrays = (a) => (b) => a.concat(b);

  const including = mergeArrays(state.data);

  function convertToUSUnits() {
    const data = state.data.map((weatherData) => weatherData);
    console.log(data);
    for (const x of data) {
      x.convertToF();
    }
    return WeatherHistory(data);
  }

  function convertToInternationalUnits() {
    return WeatherHistory(
      state.data.map((weatherData) => {
        weatherData.convertToC();
        return weatherData;
      })
    );
  }

  function lowestValue() {
    if (
      new Set(state.data.map((x) => x.getType())).size !== 1 ||
      state.data.size === 0
    ) {
      return undefined;
    }
    return state.data.reduce(
      (acc, val) => (acc < val.getValue() ? acc : val.getValue()),
      state.data[0].getValue()
    );
  }

  function highestValue() {
    if (
      new Set(state.data.map((x) => x.getType())).size !== 1 ||
      state.data.size === 0
    ) {
      return undefined;
    }
    return state.data.reduce(
      (acc, val) => (acc > val.getValue() ? acc : val.getValue()),
      state.data[0].getValue()
    );
  }

  function getData() {
    return [...state.data];
  }

  return {
    forPlace,
    forType,
    forPeriod,
    including,
    convertToUSUnits,
    convertToInternationalUnits,
    lowestValue,
    highestValue,
    getData,
  };
}

export { WeatherHistory };
