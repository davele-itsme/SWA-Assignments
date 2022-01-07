fetch("http://localhost:8080/data")
  .then((response) => response.json())
  .then((weatherdata) => {
    getLatestMeasurements(weatherdata);
    minTemp5days(weatherdata);
    maxTemp5days(weatherdata);
    totalPrecipitation5days(weatherdata);
    avgWindSpeed5days(weatherdata);
  });

fetch("http://localhost:8080/forecast")
  .then((response) => response.json())
  .then((forecastData) => {
    hourlyPrediction(forecastData);
  });

function getLatestMeasurements(weatherData) {
  const wind = weatherData.filter((wd) => wd.type == "wind speed");
  const rain = weatherData.filter((wd) => wd.type == "precipitation");
  const temp = weatherData.filter((wd) => wd.type == "temperature");

  document.getElementById("last_wind").innerHTML += JSON.stringify(
    getLastMeasurement(wind)
  );
  document.getElementById("last_rain").innerHTML += JSON.stringify(
    getLastMeasurement(rain)
  );
  document.getElementById("last_temp").innerHTML += JSON.stringify(
    getLastMeasurement(temp)
  );
}

function minTemp5days(weatherData) {
  const result = last5days(weatherData).filter(
    (wd) => wd.type == "temperature"
  );
  const minTemp = Math.min.apply(
    Math,
    result.map(function (e) {
      return e.value;
    })
  );
  document.getElementById("minTemp5days").innerHTML = minTemp;
}

function maxTemp5days(weatherData) {
  const result = last5days(weatherData).filter(
    (wd) => wd.type == "temperature"
  );
  const maxTemp = Math.max.apply(
    Math,
    result.map(function (e) {
      return e.value;
    })
  );
  document.getElementById("maxTemp5days").innerHTML = maxTemp;
}

function totalPrecipitation5days(weatherData) {
  const result = last5days(weatherData);
  let total = result
    .filter((e) => e.type == "precipitation")
    .reduce(function (sum, e) {
      return sum + e.value;
    }, 0);
  document.getElementById("totalPrecipitation").innerHTML = total.toFixed(2);
}

function avgWindSpeed5days(weatherdata) {
  const result = last5days(weatherdata);
  const average =
    result
      .filter((e) => e.type == "wind speed")
      .reduce(function (sum, e) {
        return sum + e.value;
      }, 0) / result.length;
  document.getElementById("avgWind").innerHTML = average.toFixed(2);
}

function hourlyPrediction(forecastData) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const predictionFor24h = forecastData.filter(
    (element) => new Date(element.time) <= tomorrow
  );
  const wind = predictionFor24h.filter(
    (w) => w.type == "wind speed" && w.place == "Copenhagen"
  );
  const rain = predictionFor24h.filter(
    (r) => r.type == "precipitation" && r.place == "Copenhagen"
  );
  const temperature = predictionFor24h.filter(
    (t) => t.type == "temperature" && t.place == "Copenhagen"
  );
  document.getElementById("hourlyPrediction_wind").innerHTML =
    "<pre>" + JSON.stringify(wind, undefined, 2) + "</pre>";

  document.getElementById("hourlyPrediction_rain").innerHTML =
    "<pre>" + JSON.stringify(rain, undefined, 2) + "</pre>";

  document.getElementById("hourlyPrediction_temperature").innerHTML =
    "<pre>" + JSON.stringify(temperature, undefined, 2) + "</pre>";
}

function last5days(weatherData) {
  const day = new Date();
  day.setDate(day.getDate() - 5);
  return weatherData.filter((element) => new Date(element.time) >= day);
}

function getLastMeasurement(weatherData) {
  return weatherData.reduce((a, b) => {
    return new Date(a.time) > new Date(b.time) ? a : b;
  });
}
