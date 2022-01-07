import client from "./client.js";

export class Service {

    constructor() {
        this.client = new client()
    }

    getLastMeasurements(place) {
        const m_types = ["temperature", "precipitation", "wind speed", "cloud coverage"]
        const path = `data/${place}`
        let measurements = []

        this.client.sendGetRequest(path, (response) => {
            let values = m_types.map(type => response.filter(data => data.type === type)
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .slice(0, 1))


            values.forEach((item) => {
                measurements.push(JSON.stringify(item[0]))
            })

        })
        return measurements
    }

    getMinTemp(place, dateFrom, dateTo) {
        return this.getMinOrMaxTemp(place, "min", dateFrom, dateTo)
    }

    getMaxTemp(place, dateFrom, dateTo) {
        return this.getMinOrMaxTemp(place, "max", dateFrom, dateTo)
    }

    async getMinOrMaxTemp(place, min_max, dateFrom, dateTo) {
        const path = `data/${place}`
        let min_maxTemp
        await this.client.sendGetRequest(path, (response) => {
            let result = response.filter(type => type.type === "temperature")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            min_maxTemp = result.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
                .reduce((acc, data) => min_max === "min" ? Math.min(acc, data.value) : Math.max(acc, data.value), [])
            console.log(min_maxTemp)
        })
        return min_maxTemp
    }

    async getTotalPrep(place, dateFrom, dateTo) {
        let path = `data/${place}`
        let totalPrecipitation = undefined
        await this.client.sendGetRequest(path, (response) => {
            let result = response.filter(type => type.type === "precipitation")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            totalPrecipitation = result.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
                .reduce((total, data) => total + data.value, 0)

        })
        return totalPrecipitation
    }

    async getAverageWind(place, dateFrom, dateTo) {
        let path = `data/${place}`
        let avgWind
        await this.client.sendGetRequest(path, response => {
            let result = response.filter(type => type.type === "wind speed")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            let days = result.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
            let size = days.length
            avgWind = days.reduce((total, data) => total + data.value, 0) / size
        })
        return avgWind
    }

    async getForecast(place, dateFrom, dateTo) {
        let path = `forecast/${place}`
        let Forecast
        await this.client.sendGetRequest(path, response => {
            console.log(response)
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)
            let days = response.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
            console.log(days)
            Forecast = days
        })
        return Forecast
    }

    PostWeather(obj_weather){
        let path ='data'
        this.client.sendPostRequest(path,obj_weather)
    }
}