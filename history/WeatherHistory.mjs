import {
  convertToUSUnit,
  convertToInternationalUnit,
} from "../common/Helpers.mjs";

function WeatherHistory(data) {
  const state = { data };
  const methods = {};

  methods.getData = () => state.data;

  methods.forPlace = (place) => {
    return WeatherHistory(
      state.data.filter((weatherData) => weatherData.getPlace() == place)
    );
  };

  methods.forType = (type) => {
    return WeatherHistory(
      state.data.filter((weatherData) => weatherData.getType() == type)
    );
  };

  methods.forPeriod = (period) => {
    return WeatherHistory(
      state.data.filter((weatherData) => period.contains(weatherData.getTime()))
    );
  };

  const mergeArrays = (a) => (b) => a.concat(b);

  methods.including = mergeArrays(state.data);

  // TODO: Logic for this one
  methods.convertToUSUnits = () => {
    return WeatherHistory(
      state.data.map((weatherData) => {
        weatherData.convert;
      })
    );
  };

  // TODO: Logic for this one
  methods.convertToInternationalUnits = () => {
    return WeatherHistory(state.data.map((weatherData) => weatherData));
  };

  methods.add = (data) => {
    state.data = state.data.concat(data);
  };

  methods.getFilteredData = () => {
    return state.data.filter(
      (x) =>
        x.getPlace() == state.placeFilter &&
        x.getType() == state.typeFilter &&
        state.periodFilter.contains(x.getTime())
    );
  };

  return methods;
}

export { WeatherHistory };
