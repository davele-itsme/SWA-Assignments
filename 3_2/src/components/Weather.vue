<template>
  <div>
    <p>{{weather_data}}</p>
  </div>
</template>

<script>
import {Service} from "@/store/service";
export default {
  name: "Weather",
  props: ['place'],
  data() {
    return {
      service: new Service(),
      weather_data: "",
    }
  },
  methods: {
    getLastMeasurements(){
      this.weather_data = this.service.getLastMeasurements(this.place)
    },
  },
  watch: {
    place:{
      handler(){
        this.getLastMeasurements()
      }
    }
  }
}
</script>

<style scoped>

</style>