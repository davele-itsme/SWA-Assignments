<template>
  <div>
    <label>Minimum Temperature</label>
    <p>{{minTemp}}</p>
    <label>Max Temperature</label>
    <p>{{maxTemp}}</p>
    <label>Total Precipitation</label>
    <p>{{totalPrep}}</p>
    <label>Average Wind Speed</label>
    <p>{{avgWing}}</p>
  </div>
</template>

<script>
import {Service} from "@/store/service";

export default {
  name: "WeatherDetails",
  props: ['place', 'dateFrom', 'dateTo'],
  data() {
    return {
      service: new Service(),
      minTemp: "",
      maxTemp: "",
      totalPrep: "",
      avgWing: ""
    }
  },
  computed:{
    dateChange(){
      return [this.dateFrom, this.dateTo, this.place]
    }
  },
  methods: {
    getMinTemperature(){
      this.service.getMinTemp(this.city, this.dateFrom, this.dateTo).then(result => this.minTemp = result)
    },
    getMaxTemperature(){
      this.service.getMaxTemp(this.city, this.dateFrom, this.dateTo).then(result => this.maxTemp = result)
    },
    getTotalPrecipitation(){
      this.service.getTotalPrep(this.city, this.dateFrom, this.dateTo).then(result => this.totalPrep = result)
    },
    getAverageWind(){
      this.service.getAverageWind(this.city, this.dateFrom, this.dateTo).then(result => this.avgWing = result)
    }

  },
  watch:{
    dateChange: {
      handler() {
        this.getMaxTemperature()
        this.getMinTemperature()
        this.getTotalPrecipitation()
        this.getAverageWind()
      }
    }
  }

}
</script>

<style scoped>

</style>