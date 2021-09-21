function EventClass(time, place) {
  const state = { time, place };

  state.getTime = () => state.time;
  state.getPlace = () => state.place;
  return state;
}

function DataType(type, unit) {
  const state = { type, unit };

  state.getType = () => state.type;
  state.getUnit = () => state.unit;
  return state;
}

function WeatherData(time, place, type, unit, value) {
  const state = { value };
  let eventclass = EventClass(time, place);
  let dataType = DataType(type, unit);

  state.getValue = () => state.value;
  return { ...eventclass, ...dataType, ...state };
}

function Temperature(time, place, type, unit, value) {
  let weatherdata = WeatherData(time, place, type, unit, value);

  function convertToF() {
    if (weatherdata.type == "C") {
      weatherdata.type == "F";
      weatherdata.value = weatherdata.value * (9 / 5) + 32;
      return weatherdata.value;
    }
  }
  function convertToC() {
    if (weatherdata.type == "F") {
      weatherdata.type == "C";
      weatherdata.value = (weatherdata.value - 32) * (5 / 9);
      return weatherdata.value;
    }
  }
  return { ...weatherdata, convertToC, convertToF };
}

function Precipitation(time, place, type, unit, value, precipitationType) {
  const state = { precipitationType };
  let weatherData = WeatherData(time, place, type, unit, value);

  state.getPrecipitationType = () => state.precipitationType;
  state.convertToInches = () => {
    if (weatherData.unit == "mm") {
      weatherData.unit = "inches";
      weatherData.value = weatherdata.value / 25.4;
      return weatherData.value;
    }
  };
  state.convertToMM = () => {
    if (weatherData.unit == "inches") {
      weatherData.unit == "mm";
      weatherData.value = weatherdata.value * 25.4;
      return weatherData.value;
    }
  }
  return { ...weatherData, ...state };
}

function Wind(time, place, type, unit, value, direction) {
  const state = { direction };
  let weatherdata = WeatherData(time, place, type, unit, value);

  state.getDirection = () => state.direction;
  state.convertToMph = () => {
    if ((weatherdata.unit = "ms")) {
      weatherdata.unit = "mph";
      weatherdata.value = weatherdata.value * 2.237;
      return weatherdata.value;
    }
  };

  state.convertToMs = () => {
    if ((weatherdata.unit = "mph")) {
      weatherdata.unit = "ms";
      weatherdata.value = weatherdata.value / 2.237;
      return weatherdata.value;
    }
  };

  return { ...wind, ...state };
}

function WeatherPrediction(time, place, type, unit, max, min) {
  const state = { max, min };
  let eventClass = EventClass(time, place);
  let dataType = DataType(type, unit);

  state.matches = (data) => {
    return (
      data.time == eventclass.time &&
      data.place == eventclass.place &&
      data.type == dataType.type &&
      data.unit == dataType.unit &&
      data.value < state.max &&
      data.value > state.min
    );
  };
  state.getMax = () => state.max;
  state.getMin = () => state.min;

  return { ...eventClass, ...dataType, ...state }
}

function TemperaturePrediction(time, place, type, unit, max, min) {
  let weatherPrediction = WeatherPrediction(time, place, type, unit, max, min);

  function convertToF() {
    if (weatherPrediction.type == "C") {
      weatherPrediction.type == "F";
      weatherPrediction.value = weatherPrediction.value * (9 / 5) + 32;
      return weatherPrediction.value;
    }
  }
  function convertToC() {
    if (weatherPrediction.type == "F") {
      weatherPrediction.type == "C";
      weatherPrediction.value = (weatherPrediction.value - 32) * (5 / 9);
      return weatherPrediction.value;
    }
  }
  return { ...weatherPrediction, convertToC, convertToF };
}

function PrecipitationPrediction(time, place, type, unit, value, expectedTypes) {
  const state = { expectedTypes };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, value);

  state.getExpectedTypes = () => state.expectedTypes;
  state.matches = (data) => {

  };
  state.convertToInches = () => {
    if (weatherPrediction.unit == "mm") {
      weatherPrediction.unit = "inches";
      weatherPrediction.value = weatherPrediction.value / 25.4;
      return weatherPrediction.value;
    }
  };
  state.convertToMM = () => {
    if (weatherPrediction.unit == "inches") {
      weatherPrediction.unit == "mm";
      weatherPrediction.value = weatherPrediction.value * 25.4;
      return weatherPrediction.value;
    }
  }
  return { ...weatherPrediction, ...state };
}

function WindPrediction(time, place, type, unit, value, expectedDirections) {
  const state = { expectedDirections };
  let weatherPrediction = WeatherPrediction(time, place, type, unit, value);

  state.getExpectedDirections = () => state.expectedDirections;
  state.matches = (data) => {};
  state.convertToMph = () => {
    if ((weatherPrediction.unit = "ms")) {
      weatherPrediction.unit = "mph";
      weatherPrediction.value = weatherPrediction.value * 2.237;
      return weatherPrediction.value;
    }
  };

  state.convertToMs = () => {
    if ((weatherPrediction.unit = "mph")) {
      wiweatherPredictionnd.unit = "ms";
      weatherPrediction.value = weatherPrediction.value / 2.237;
      return weatherPrediction.value;
    }
  };

  return { ...weatherPrediction, ...state };
}

function WeatherForecast(data) {
  const state = { data };

  state.getPlaceFilter = () => state.placeFilter;

  state.setPlaceFilter = (filter) => {
    state.placefilter = filter;
  };

  state.clearPlaceFilter = () => {
    state.placeFilter = "";
  };

  state.getPeriodFilter = () => state.periodFilter;

  state.setPeriodFilter = (period) => {
    state.periodFilter = period;
  };

  state.clearPeriodFilter = () => {
    state.periodFilter = "";
  };

  state.convertToUSUnits = () => {
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

  state.convertToInternationalUnits = () => {
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

  state.add = (data) => {
    state.data = state.data.concat(data);
  };

  state.getFilteredPredictions = () => {
    return state.data.filter(
      (x) =>
        x.place == state.placeFilter &&
        x.type == state.typeFilter &&
        x.period == state.periodFilter
    );
  };

  return state;
}

function WeatherHistory(data) {
  const state = { data };

  state.getPlaceFilter = () => state.placeFilter;

  state.setPlaceFilter = (filter) => {
    state.placefilter = filter;
  };

  state.clearPlaceFilter = () => {
    state.placeFilter = "";
  };

  state.getPeriodFilter = () => state.periodFilter;

  state.setPeriodFilter = (period) => {
    state.periodFilter = period;
  };

  state.clearPeriodFilter = () => {
    state.periodFilter = "";
  };

  state.convertToUSUnits = () => {
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

  state.convertToInternationalUnits = () => {
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

  state.add = (data) => {
    state.data = state.data.concat(data);
  };

  state.getFilteredPredictions = () => {
    return state.data.filter(
      (x) =>
        x.place == state.placeFilter &&
        x.type == state.typeFilter &&
        x.period == state.periodFilter
    );
  };

  return state;
}

function DateInterval(from, to) {
  const state = { from, to };

  state.getFrom = () => state.from;
  state.getTo = () => state.to;
  state.contains(d) = () => {
    return d > state.from && d < state.to;
  }

  return state;
}

const eventclasstype = EventClass(20, "Bucharest");
const datatypetypes = DataType("c", 20);
const weatherDatatest = WeatherData(20, "Bucharest", "c", 20, 22);
console.log(weatherDatatest.getType());

const temperaturetest = Temperature(20, "Bucharest", "F", 20, 22);

console.log(temperaturetest.convertToC());
console.log(weatherDatatest);
console.log(temperaturetest);
