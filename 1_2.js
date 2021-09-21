function EventClass(time, place) {
  //Renamed to EventClass so that it is not confused with Event
  this.time = time;
  this.place = place;

  this.getTime = () => this.time;
  this.getPlace = () => this.place;
}

function DataType(type, unit) {
  this.type = type;
  this.unit = unit;

  this.getType = () => this.type;
  this.getUnit = () => this.unit;
}

function WeatherData(time, place, type, unit, value) {
  EventClass.call(this, time, place);
  DataType.call(this, type, unit);
  this.value = value;

  this.getValue = () => this.value;
}
Object.setPrototypeOf(WeatherData.prototype, EventClass.prototype);
Object.setPrototypeOf(WeatherData.prototype, DataType.prototype);

function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);

  this.convertToF = () => {
    if (this.unit == "C") {
      this.unit = "F";
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.unit == "F") {
      this.unit = "C";
      this.value = (5 / 9) * (this.value - 32);
    }
  };
}
Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype);

function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationType = precipitationType;

  this.getPrecipitationType = () => this.precipitationType;
  this.convertToInches = () => {
    if (this.unit == "mm") {
      this.unit = "inches";
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.unit == "inches") {
      this.unit = "mm";
      this.value = this.value * 25.4;
    }
  };
}
Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype);

function Wind(time, place, type, unit, value, direction) {
  WeatherData.call(this, time, place, type, unit, value);
  this.direction = direction;

  this.getDirection = () => this.direction;
  this.convertToMPH = () => {
    if (this.unit == "ms") {
      this.unit = "mph";
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.unit == "mph") {
      this.unit = "ms";
      this.value = this.value / 2.237;
    }
  };
}
Object.setPrototypeOf(Wind.prototype, WeatherData.prototype);

function WeatherPrediction(time, place, type, unit, max, min) {
  EventClass.call(this, time, place);
  DataType.call(this, type, unit);
  this.max = max;
  this.min = min;

  this.matches = (data) => {
    return (
      data.time == this.time &&
      data.place == this.place &&
      data.type == this.type &&
      data.unit == this.unit &&
      data.value < this.max &&
      data.value > this.min
    );
  };
  this.getMax = () => this.max;
  this.getMin = () => this.min;
}
Object.setPrototypeOf(WeatherPrediction.prototype, EventClass.prototype);
Object.setPrototypeOf(WeatherPrediction.prototype, DataType.prototype);

function TemperaturePrediction(time, place, type, unit, value) {
  WeatherPrediction.call(this, time, place, type, unit, value);
  this.convertToF = () => {
    if (this.unit == "C") {
      this.unit = "F";
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.unit == "F") {
      this.unit = "C";
      this.value = (5 / 9) * (this.value - 32);
    }
  };
}
Object.setPrototypeOf(
  TemperaturePrediction.prototype,
  WeatherPrediction.prototype
);

function PrecipitationPrediction(time, place, type, unit, expectedTypes) {
  WeatherPrediction.call(this, time, place, type, unit);
  this.expectedTypes = expectedTypes;

  this.getExpectedTypes = () => this.expectedTypes;
  this.matches = (data) => {};
  this.convertToInches = () => {
    if (this.unit == "mm") {
      this.unit = "inches";
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.unit == "inches") {
      this.unit = "mm";
      this.value = this.value * 25.4;
    }
  };
}
Object.setPrototypeOf(
  PrecipitationPrediction.prototype,
  WeatherPrediction.prototype
);

function WindPrediction(time, place, type, unit, value, expectedDirections) {
  WeatherPrediction.call(this, time, place, type, unit, value);
  this.expectedDirections = expectedDirections;

  this.getExpectedDirections = () => this.expectedDirections;
  this.matches = (data) => {};
  this.convertToMPH = () => {
    if (this.unit == "ms") {
      this.unit = "mph";
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.unit == "mph") {
      this.unit = "ms";
      this.value = this.value / 2.237;
    }
  };
}
Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction.prototype);

function WeatherForecast(data) {
  this.data = data;
  this.getPlaceFilter = () => this.placeFilter;
  this.setPlaceFilter = (filter) => {
    this.placeFilter = filter;
  };
  this.clearPlaceFilter = () => {
    this.placeFilter = "";
  };
  this.getTypeFilter = () => this.typeFilter;
  this.setTypeFilter = (type) => {
    this.typeFilter = type;
  };
  this.clearTypeFilter = () => {
    this.typeFilter = "";
  };
  this.getPeriodFilter = () => this.periodFilter;
  this.setPeriodFilter = (period) => {
    this.periodFilter = period;
  };
  this.clearPeriodFilter = () => {
    this.periodFilter = new DateInterval(0, 0);
  };
  this.convertToUSUnits = () => {
    this.data.forEach((weatherPrediction) => {
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
  this.convertToInternationalUnits = () => {
    this.data.forEach((weatherPrediction) => {
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
  this.add = (data) => {
    this.data = this.data.concat(data);
  };
  this.getFilteredPredictions = () => {
    return this.data.filter(
      (x) =>
        x.place == this.placeFilter &&
        x.type == this.typeFilter &&
        x.period == this.periodFilter
    );
  };
}

function WeatherHistory(data) {
  this.data = data;
  this.getPlaceFilter = () => this.placeFilter;
  this.setPlaceFilter = (filter) => {
    this.placeFilter = filter;
  };
  this.clearPlaceFilter = () => {
    this.placeFilter = "";
  };
  this.getTypeFilter = () => this.typeFilter;
  this.setTypeFilter = (type) => {
    this.typeFilter = type;
  };
  this.clearTypeFilter = () => {
    this.typeFilter = "";
  };
  this.getPeriodFilter = () => this.periodFilter;
  this.setPeriodFilter = (period) => {
    this.periodFilter = period;
  };
  this.clearPeriodFilter = () => {
    this.periodFilter = new DateInterval(0, 0);
  };
  this.convertToUSUnits = () => {
    this.data.forEach((weatherPrediction) => {
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
  this.convertToInternationalUnits = () => {
    this.data.forEach((weatherPrediction) => {
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
  this.add = (data) => {
    this.data = this.data.concat(data);
  };
  this.getFilteredPredictions = () => {
    return this.data.filter(
      (x) =>
        x.place == this.placeFilter &&
        x.type == this.typeFilter &&
        x.period == this.periodFilter
    );
  };
}

function DateInterval(from, to) {
  this.from = from;
  this.to = to;
  this.getFrom = () => this.from;
  this.getTo = () => this.to;
  this.contains = (d) => {
    return d > from && d < to;
  };
}
