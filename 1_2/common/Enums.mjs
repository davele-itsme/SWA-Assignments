const TypesEnum = {
  TEMPERATURE: "temperature",
  PRECIPITATION: "precipitation",
  WIND: "wind speed",
};

const TemperatureUnitEnum = { C: "Celsius", F: "Fahrenheit" };
Object.freeze(TemperatureUnitEnum);

const PrecipitationUnitEnum = { MM: "mm", INCHES: "Inches" };
Object.freeze(PrecipitationUnitEnum);

const WindUnitEnum = { MS: "ms", MPH: "mph" };
Object.freeze(WindUnitEnum);

export { TypesEnum, TemperatureUnitEnum, PrecipitationUnitEnum, WindUnitEnum };
