
function EventClass(time, place) {
   const state = {time}
   return {
       getTime(){return state.time;},
       getPlace(){return state.place;}
   }
}

function DataType(type, unit){
  const state ={type, unit}
        return {
         getType(){return state.type;},
         getUnit(){ return state.unit;}

    }
}

function WeatherData(time, place, type, unit, value) {
    const state = {time, place, type, unit, value}
    let eventclass = EventClass(time, place)
    let dataType = DataType(type, unit)
    function getValue() { return state.value}
    return {...eventclass, ...dataType, getValue}
}

function Temperature(time, place, type, unit, value){
    const state = {time, place, type, unit, value}
    let weatherdata = WeatherData(time, place, type, unit, value)
    function convertToF() {
        if (state.type == "C"){
            state.type == "F";
            state.value = state.value*(9/5) + 32;
            return state.value;
        }
    }
    function convertToC(){
        if(state.type == "F"){
            state.type == "C";
            state.value = (state.value - 32) * (5/9);
            return state.value;
        }

    }
    return{...weatherdata, convertToC, convertToF}
}

function Precipitation(time, place, type, unit, value){
    const state = {time, place, type, unit, value}
    let precipitation = WeatherData(time, place, type, unit, value)

    function convertToInches(){
        if(state.unit == "mm"){
            state.unit = "inches";
            state.value = state.value / 25.4;
            return state.value;
        }
    }
    function convertToMM(){
        if(state.unit == "inches"){
            state.unit == "mm";
            state.value = state.value * 25.4;
            return state.value;
        }
    }
    return{...precipitation, convertToInches, convertToMM}
}

function Wind(time, place, type, unit, value, direction){
    const state = {time, place, type, unit, value, direction}
    let wind = WeatherData(time, place, type, unit, value)

    function getDirection(){
        return this.state.direction;
    }

    function convertToMph(){
        if(state.unit = "ms"){
            state.unit = "mph";
            state.value = state.value  * 2.237;
            return state.value;
        }
    }

    function convertToMs(){
        if(this.state.unit = "mph"){
            state.unit = "ms";
            state.value = this.state.value / 2.237;
            return state.value;
        }
    }

    return {...wind, convertToMph, convertToMs}
}

function WeatherPrediction() {}

function WeatherForecastHistory(data){
    const state = {data};

    function getPlaceFilter(){
        return this.placefilter;
    }

    function setPlaceFilter(filter){
        this.placefilter = filter;
    }

    function clearPlaceFilter(){
        this.placeFilter = "";
    }

    function getPeriodFilter(){
        return this.periodFilter;
    }

    function setPeriodFilter(period){
        this.periodFilter = period;
    }

    function clearPeriodFilter(){
        this.periodFilter = "";
    }

    function convertToUSUnits(){
        state.data.forEach(weatherPrediction)
        {
            switch (true){
                case weatherPrediction instanceof TemperaturePrediction:
                    weatherPrediction.convertToF();
                case weatherPrediction instanceof PrecipitationPrediction:
                    weatherPrediction.convertToInches();
                case weatherPrediction instanceof WindPrediction:
                    weatherPrediction.convertToMph();
                default:
                    console.log("Error")
            }
        }
    }

    function convertToInternationalUnits(){
        state.data.forEach(weatherPrediction)
        {
            switch (true){
                case weatherPrediction instanceof TemperaturePrediction:
                    weatherPrediction.convertToC();
                case weatherPrediction instanceof PrecipitationPrediction:
                    weatherPrediction.convertToMM();
                case weatherPrediction instanceof WindPrediction:
                    weatherPrediction.convertToMS();
                default:
                    console.log("Error happened");
            }
        }
    }

    function add(data){
       state.data = state.data.concat(data)
    }

    function getFilterPredictions(){
        return this.state.data(
            (x) =>
                x.place == this.placeFilter &&
                x.type == this.typeFilter &&
                x.period == this.periodFilte
        )
    }
}

function DateInterval(from, to){
    const state = {from, to}
    state.from = from;
    state.to = to;

    function getFrom(){
        return state.from;
    }

    function getTo(){
        return state.to;
    }

    function contains(d){
        return d>state.from && d<state.to;
    }
}



const eventclasstype = EventClass(20, "Bucharest")
const datatypetypes = DataType("c", 20)
const weatherDatatest = WeatherData (20, "Bucharest", "c", 20,22)

const temperaturetest = Temperature (20, "Bucharest", "F", 20,22)


console.log(temperaturetest.convertToC())