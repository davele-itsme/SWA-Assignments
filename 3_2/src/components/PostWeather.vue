<template>
  <div>
    <h3>Report historical data</h3>

    <label>Choose type</label>
    <select v-model="measurement_type">
      <option v-for="type in m_types" :key="type.id">{{ type }}</option>
    </select>

    <label>Choose place</label>
    <select v-model="measurement_place">
      <option v-for="place in places" :key="place.id">{{ place }}</option>
    </select>

    <label>Date-Time</label>
    <date-pick
        v-model="measurement_date"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <label>Value</label>
    <input type="number" v-model="measurement_value">

    <label>Unit</label>
    <select v-model="measurement_unit">
      <option v-for="unit in m_units" :key="unit.id">{{ unit }}</option>
    </select>



    <button v-on:click="OnPostWeather()">PostWeather</button>

  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import {Service} from "@/store/service";

export default {
  name: "PostWeather",
  props: {},
  components: {
    DatePick
  },
  data() {
    return {
      service: new Service(),

      m_types: ["temperature", "precipitation", "wind"],
      places: ["Copenhagen", "Aarhus", "Horsens"],

      temp_units: ["C", "F"],

      precip_units: ["mm", "inches"],


      measurement_type: "",
      measurement_place: "",
      measurement_date: "",
      measurement_value: "",
      measurement_unit: "",

    }
  },
  computed: {
    m_units() {
      let units
      switch (this.measurement_type) {
        case "temperature":
          units = this.temp_units
          break;
        case "precipitation":
          units = this.precip_units
          break;
      }
      return units
    }
  },
  methods: {
    OnPostWeather() {
      let obj = {
        type: this.measurement_type,
        time: this.measurement_date,
        place: this.measurement_place,
        value: this.measurement_value,
        unit: this.measurement_unit
      }


      this.service.PostWeather(obj)
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>