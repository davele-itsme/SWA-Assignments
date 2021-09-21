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
  const state = Object.assign({ value }, EventClass(time, place), DataType(type, unit));

  state.getValue = () => state.value;
  return state;
}

function Temperature(time, place, type, unit, value) {
  const state = Object.assign({}, WeatherData(time, place, type, unit, value));

  state.convertToF = () => {
    if (state.type == "C") {
      state.type == "F";
      state.value = state.value * (9 / 5) + 32;
    }
  }
  state.convertToC = () => {
    if (state.type == "F") {
      state.type == "C";
      state.value = (state.value - 32) * (5 / 9);
    }
  }
  return state;
}

function Precipitation(time, place, type, unit, value, precipitationType) {
  const state = Object.assign({ precipitationType }, WeatherData(time, place, type, unit, value));

  state.getPrecipitationType = () => state.precipitationType;
  state.convertToInches = () => {
    if (state.unit == "mm") {
      state.unit = "inches";
      state.value = state.value / 25.4;
      return state.value;
    }
  };
  state.convertToMM = () => {
    if (state.unit == "inches") {
      state.unit == "mm";
      state.value = state.value * 25.4;
      return state.value;
    }
  };
  return state;
}

function Wind(time, place, type, unit, value, direction) {
  const state = Object.assign({ direction }, WeatherData(time, place, type, unit, value));

  state.getDirection = () => state.direction;
  state.convertToMph = () => {
    if ((state.unit = "ms")) {
      state.unit = "mph";
      state.value = state.value * 2.237;
      return state.value;
    }
  };

  state.convertToMs = () => {
    if ((state.unit = "mph")) {
      state.unit = "ms";
      state.value = state.value / 2.237;
      return state.value;
    }
  };

  return state;
}

function WeatherPrediction(time, place, type, unit, max, min) {
  const state = Object.assign({ max, min }, EventClass(time, place), DataType(type, unit));

  state.matches = (data) => {
    return (
      data.time == state.time &&
      data.place == state.place &&
      data.type == state.type &&
      data.unit == state.unit &&
      data.value < state.max &&
      data.value > state.min
    );
  };
  state.getMax = () => state.max;
  state.getMin = () => state.min;

  return state;
}

function TemperaturePrediction(time, place, type, unit, max, min) {
  const state = Object.assign({}, WeatherPrediction(time, place, type, unit, max, min));

  state.convertToF = () => {
    if (state.type == "C") {
      state.type == "F";
      state.value = state.value * (9 / 5) + 32;
      return state.value;
    }
  }
  state.convertToC = () => {
    if (state.type == "F") {
      state.type == "C";
      state.value = (state.value - 32) * (5 / 9);
      return state.value;
    }
  }
  return state;
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
  const state = Object.assign({ expectedTypes }, WeatherPrediction(time, place, type, unit, max, min));

  state.getExpectedTypes = () => state.expectedTypes;
  state.matches = (data) => {};
  state.convertToInches = () => {
    if (state.unit == "mm") {
      state.unit = "inches";
      state.value = state.value / 25.4;
      return state.value;
    }
  };
  state.convertToMM = () => {
    if (state.unit == "inches") {
      state.unit == "mm";
      state.value = state.value * 25.4;
      return state.value;
    }
  };
  return state;
}

function WindPrediction(time, place, type, unit, max, min, expectedDirections) {
  const state = Object.assign({ expectedDirections }, WeatherPrediction(time, place, type, unit, max, min));

  state.getExpectedDirections = () => state.expectedDirections;
  state.matches = (data) => {};
  state.convertToMph = () => {
    if ((state.unit = "ms")) {
      state.unit = "mph";
      state.value = state.value * 2.237;
      return state.value;
    }
  };

  state.convertToMs = () => {
    if ((state.unit = "mph")) {
      state.unit = "ms";
      state.value = state.value / 2.237;
      return state.value;
    }
  };

  return state;
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

const temperaturetest = Temperature(20, "Bucharest", "US", "F", 20);
temperaturetest.convertToC()
console.log(temperaturetest.getValue());
console.log(temperaturetest);