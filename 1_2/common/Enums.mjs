//seal and freeze the object
const TypesEnum = { INT: "International", US: "US" };
Object.freeze(TypesEnum);

const TemperatureUnitEnum = { C: "Celsius", F: "Fahrenheit" };
Object.freeze(TemperatureUnitEnum);

const PrecipitationUnitEnum = { MM: "mm", INCHES: "Inches" };
Object.freeze(PrecipitationUnitEnum);

const WindUnitEnum = { MS: "ms", MPH: "mph" };
Object.freeze(WindUnitEnum);

export { TypesEnum, TemperatureUnitEnum, PrecipitationUnitEnum, WindUnitEnum };
