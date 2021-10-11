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
WeatherData.prototype = Object.assign({}, Event.prototype, DataType.prototype);
WeatherData.prototype.constructor = WeatherData;

function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);

  this.convertToF = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = TemperatureUnitEnum.F;
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = TemperatureUnitEnum.C;
      this.value = (this.value - 32) * (5 / 9);
    }
  };
}
Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype);

function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationType = precipitationType;

  this.getPrecipitationType = () => this.precipitationType;
  this.convertToInches = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = PrecipitationUnitEnum.INCHES;
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = PrecipitationUnitEnum.MM;
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
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = WindUnitEnum.MPH;
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = WindUnitEnum.MS;
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
WeatherPrediction.prototype = Object.assign(
  {},
  EventClass.prototype,
  DataType.prototype
);
WeatherPrediction.prototype.constructor = WeatherPrediction;

function TemperaturePrediction(time, place, type, unit, value) {
  WeatherPrediction.call(this, time, place, type, unit, value);
  this.convertToF = () => {
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = TemperatureUnitEnum.F;
      this.value = this.value * (9 / 5) + 32;
    }
  };
  this.convertToC = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = TemperatureUnitEnum.C;
      this.value = (this.value - 32) * (5 / 9);
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
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = PrecipitationUnitEnum.INCHES;
      this.value = this.value / 25.4;
    }
  };
  this.convertToMM = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = PrecipitationUnitEnum.MM;
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
    if (this.type == TypesEnum.International) {
      this.type = TypesEnum.US;
      this.unit = WindUnitEnum.MPH;
      this.value = this.value * 2.237;
    }
  };
  this.convertToMS = () => {
    if (this.type == TypesEnum.US) {
      this.type = TypesEnum.International;
      this.unit = WindUnitEnum.MS;
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
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = new DateInterval(from, to);
    this.periodFilter = dateInterval;
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
        this.periodFilter.contains(x.getTime())
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
    let from = new Date(2000, 1, 1);
    let to = Date.now();
    let dateInterval = new DateInterval(from, to);
    this.periodFilter = dateInterval;
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
  this.getFilteredData = () => {
    return this.data.filter(
      (x) =>
        x.place == this.placeFilter &&
        x.type == this.typeFilter &&
        this.periodFilter.contains(x.getTime())
    );
  };
}

function DateInterval(from, to) {
  this.from = from;
  this.to = to;
  this.getFrom = () => this.from;
  this.getTo = () => this.to;
  this.contains = (d) => {
    return d >= this.from && d <= this.to;
  };
}

//TESTING

var temperature = new Temperature(
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

var precipitation = new Precipitation(
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

var wind = new Wind(
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
const weatherHistory = new WeatherHistory(weathers);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setTypeFilter(TypesEnum.US);
console.log(weatherHistory.getTypeFilter());
weatherHistory.setPlaceFilter("Prague");
console.log(weatherHistory.getPlaceFilter());
weatherHistory.setPeriodFilter(
  new DateInterval(new Date(2010, 5, 5), Date.now())
);
console.log(weatherHistory.getPeriodFilter());
console.log(weatherHistory.getFilteredData());

console.log("-------------------------------------------------");

const eventClass = new EventClass(new Date(2011, 6, 6), "HoChiMin");
console.log(eventClass.__proto__);
const weatherData = new WeatherData(
  new Date(2015, 5, 5),
  "Prague",
  TypesEnum.US,
  "something",
  "some"
);
console.log(weatherData);
console.log(Object.getPrototypeOf(weatherData));
