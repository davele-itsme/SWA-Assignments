const TypesEnum = { INT: "International", US: "US" };
Object.freeze(TypesEnum); //seal and freeze the object

const TemperatureUnitEnum = { C: "Celsius", F: "Fahrenheit" };
Object.freeze(TemperatureUnitEnum);

const PrecipitationUnitEnum = { MM: "mm", INCHES: "Inches" };
Object.freeze(PrecipitationUnitEnum);

const WindUnitEnum = { MS: "ms", MPH: "mph" };
Object.freeze(WindUnitEnum);

function EventClass(time, place) {
  //Renamed to EventClass so that it is not confused with Event
  const state = { time, place };

  return {
    getTime() {
      return state.time;
    },
    getPlace() {
      return state.place;
    },
  };
}

function DataType(type, unit) {
  const state = { type, unit };

  return {
    getType() {
      return state.type;
    },
    setType(type) {
      state.type = type;
    },
    getUnit() {
      return state.unit;
    },
    setUnit(unit) {
      state.unit = unit;
    },
  };
}

function WeatherData(time, place, type, unit, value) {
  const state = { value };
  let eventClass = EventClass(time, place);
  let dataType = DataType(type, unit);
  getValue = () => state.value;
  setValue = (value) => {
    state.value = value;
  };
  return Object.assign({ getValue, setValue }, eventClass, dataType);
}

function Temperature(time, place, type, unit, value) {
  let weatherData = WeatherData(time, place, type, unit, value);
  convertToF = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(TemperatureUnitEnum.F);
      let newValue = weatherData.getValue() * (9 / 5) + 32;
      weatherData.setValue(newValue);
    }
  };
  convertToC = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(TemperatureUnitEnum.C);
      let newValue = (weatherData.getValue() - 32) * (5 / 9);
      weatherData.setValue(newValue);
    }
  };
  return Object.assign({ convertToF, convertToC }, weatherData);
}

function Precipitation(time, place, type, unit, value, precipitationType) {
  const state = { precipitationType };
  let weatherData = WeatherData(time, place, type, unit, value);

  getPrecipitationType = () => state.precipitationType;
  convertToInches = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherData.getValue() / 25.4;
      weatherData.setValue(newValue);
    }
  };
  convertToMM = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(PrecipitationUnitEnum.MM);
      let newValue = weatherData.getValue() * 25.4;
      weatherData.setValue(newValue);
    }
  };
  return Object.assign(
    { getPrecipitationType, convertToInches, convertToMM },
    weatherData
  );
}

function Wind(time, place, type, unit, value, direction) {
  const state = { direction };
  let weatherData = WeatherData(time, place, type, unit, value);

  getDirection = () => state.direction;
  convertToMPH = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(WindUnitEnum.MPH);
      let newValue = weatherData.getValue() * 2.237;
      weatherData.setValue(newValue);
    }
  };

  convertToMS = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(WindUnitEnum.MS);
      let newValue = weatherData.getValue() / 2.237;
      weatherData.setValue(newValue);
    }
  };

  return Object.assign(
    { getDirection, convertToMPH, convertToMS },
    weatherData
  );
}

function WeatherPrediction(time, place, type, unit, max, min) {
  const state = { max, min };
  let eventClass = EventClass(time, place);
  let dataType = DataType(type, unit);
  matches = (data) => {
    return (
      data.time == eventClass.getTime() &&
      data.place == eventClass.getPlace() &&
      data.type == dataType.getType() &&
      data.unit == dataType.getUnit() &&
      data.value < state.max &&
      data.value > state.min
    );
  };
  getMax = () => state.max;
  getMin = () => state.min;

  return Object.assign({ matches, getMax, getMin }, eventClass, dataType);
}

function TemperaturePrediction(time, place, type, unit, max, min) {
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  convertToF = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(TemperatureUnitEnum.F);
      let newValue = weatherPrediction.getValue() * (9 / 5) + 32;
      weatherPrediction.setValue(newValue);
    }
  };
  convertToC = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(TemperatureUnitEnum.C);
      let newValue = (weatherPrediction.getValue() - 32) * (5 / 9);
      weatherPrediction.setValue(newValue);
    }
  };
  return Object.assign({ convertToF, convertToC }, weatherPrediction);
}

function PrecipitationPrediction(
  time,
  place,
  type,
  unit,
  max,
  min,
  expectedTypes
) {
  const state = { expectedTypes };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  getExpectedTypes = () => state.expectedTypes;
  matches = (data) => {};
  convertToInches = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(PrecipitationUnitEnum.INCHES);
      let newValue = weatherPrediction.getValue() / 25.4;
      weatherPrediction.setValue(newValue);
    }
  };
  convertToMM = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(PrecipitationUnitEnum.MM);
      let newValue = weatherPrediction.getValue() * 25.4;
      weatherPrediction.setValue(newValue);
    }
  };
  return Object.assign(
    { getExpectedTypes, matches, convertToInches, convertToMM },
    weatherPrediction
  );
}

function WindPrediction(time, place, type, unit, max, min, expectedDirections) {
  const state = { expectedDirections };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  getExpectedDirections = () => state.expectedDirections;
  matches = (data) => {};
  convertToMPH = () => {
    if (weatherData.getType() == TypesEnum.International) {
      weatherData.setType(TypesEnum.US);
      weatherData.setUnit(WindUnitEnum.MPH);
      let newValue = weatherPrediction.getValue() * 2.237;
      weatherPrediction.setValue(newValue);
    }
  };

  convertToMS = () => {
    if (weatherData.getType() == TypesEnum.US) {
      weatherData.setType(TypesEnum.International);
      weatherData.setUnit(WindUnitEnum.MS);
      let newValue = weatherPrediction.getValue() / 2.237;
      weatherPrediction.setValue(newValue);
    }
  };

  return Object.assign(
    { getExpectedDirections, matches, convertToMPH, convertToMS },
    weatherPrediction
  );
}

function WeatherForecast(data) {
  const state = { data };
  const methods = {};

  methods.getPlaceFilter = () => state.placeFilter;

  methods.setPlaceFilter = (filter) => {
    state.placeFilter = filter;
  };

  methods.clearPlaceFilter = () => {
    state.placeFilter = "";
  };

  methods.getTypeFilter = () => state.typeFilter;

  methods.setTypeFilter = (type) => {
    state.typeFilter = type;
  };

  methods.clearTypeFilter = () => {
    state.typeFilter = "";
  };

  methods.getPeriodFilter = () => state.periodFilter;

  methods.setPeriodFilter = (period) => {
    state.periodFilter = period;
  };

  methods.clearPeriodFilter = () => {
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = DateInterval(from, to);
    state.periodFilter = dateInterval;
  };

  methods.convertToUSUnits = () => {
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof TemperaturePrediction:
          weatherPrediction.convertToF();
        case weatherPrediction instanceof PrecipitationPrediction:
          weatherPrediction.convertToInches();
        case weatherPrediction instanceof WindPrediction:
          weatherPrediction.convertToMPH();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.convertToInternationalUnits = () => {
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof TemperaturePrediction:
          weatherPrediction.convertToC();
        case weatherPrediction instanceof PrecipitationPrediction:
          weatherPrediction.convertToMM();
        case weatherPrediction instanceof WindPrediction:
          weatherPrediction.convertToMS();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.add = (data) => {
    state.data = state.data.concat(data);
  };

  methods.getFilteredPredictions = () => {
    return state.data.filter(
      (x) =>
        x.getPlace() == state.placeFilter &&
        x.getType() == state.typeFilter &&
        state.periodFilter.contains(x.getTime())
    );
  };

  return methods;
}

function WeatherHistory(data) {
  const state = { data };
  const methods = {};

  methods.getPlaceFilter = () => state.placeFilter;

  methods.setPlaceFilter = (filter) => {
    state.placeFilter = filter;
  };

  methods.clearPlaceFilter = () => {
    state.placeFilter = "";
  };

  methods.getTypeFilter = () => state.typeFilter;

  methods.setTypeFilter = (type) => {
    state.typeFilter = type;
  };

  methods.clearTypeFilter = () => {
    state.typeFilter = "";
  };

  methods.getPeriodFilter = () => state.periodFilter;

  methods.setPeriodFilter = (period) => {
    state.periodFilter = period;
  };

  methods.clearPeriodFilter = () => {
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = DateInterval(from, to);
    state.periodFilter = dateInterval;
  };

  methods.convertToUSUnits = () => {
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof Temperature:
          weatherPrediction.convertToF();
        case weatherPrediction instanceof Precipitation:
          weatherPrediction.convertToInches();
        case weatherPrediction instanceof Wind:
          weatherPrediction.convertToMPH();
        default:
          console.log("Error happened");
      }
    });
  };

  methods.convertToInternationalUnits = () => {
    state.data.forEach((weatherPrediction) => {
      switch (true) {
        case weatherPrediction instanceof Temperature:
          weatherPrediction.convertToC();
        case weatherPrediction instanceof Precipitation:
          weatherPrediction.convertToMM();
        case weatherPrediction instanceof Wind:
          weatherPrediction.convertToMS();
        default:
          console.log("Error happened");
      }
    });
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

function DateInterval(from, to) {
  const state = { from, to };

  getFrom = () => state.from;
  getTo = () => state.to;
  contains = (d) => {
    return d >= state.from && d <= state.to;
  };

  return { getFrom, getTo, contains };
}

//TESTING

var temperature = Temperature(
  new Date(2015, 6, 5),
  "Prague",
  TypesEnum.US,
  TemperatureUnitEnum.F,
  5
);
console.log(temperature.getValue() + " " + temperature.getUnit());
temperature.convertToC();
console.log(temperature.getValue() + " " + temperature.getUnit());
temperature.convertToF();
console.log(temperature.getValue() + " " + temperature.getUnit());

console.log("-------------------------");

var precipitation = Precipitation(
  new Date(2016, 5, 5),
  "London",
  TypesEnum.US,
  PrecipitationUnitEnum.INCHES,
  10,
  "something"
);
console.log(precipitation.getValue() + " " + precipitation.getUnit());
precipitation.convertToMM();
console.log(precipitation.getValue() + " " + precipitation.getUnit());
precipitation.convertToInches();
console.log(precipitation.getValue() + " " + precipitation.getUnit());

console.log("-------------------------");

var wind = Wind(
  new Date(2019, 5, 5),
  "Copenhagen",
  TypesEnum.US,
  WindUnitEnum.MPH,
  10,
  "west"
);
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMS();
console.log(wind.getValue() + " " + wind.getUnit());
wind.convertToMPH();
console.log(wind.getValue() + " " + wind.getUnit());

console.log("-------------------------");

const weathers = [temperature, precipitation, wind];
const weatherHistory = WeatherHistory(weathers);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setTypeFilter(TypesEnum.US);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setPlaceFilter("Prague");
console.log(weatherHistory.getPlaceFilter());
weatherHistory.setPeriodFilter(DateInterval(new Date(2010, 5, 5), Date.now()));
console.log(weatherHistory.getPeriodFilter());
console.log(weatherHistory.getFilteredData());
