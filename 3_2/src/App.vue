<template>
  <div id="app">

    <h1 class="title text-center">Weather in</h1>
    <form class="search-location" v-on:submit.prevent="getWeather">
      <input
          type="text"
          class="form-control text-muted form-rounded p-4 shadow-sm"
          placeholder="What City?"
          v-model="citySearch"
          autocomplete="off"
      />
    </form>

    <label>Date From</label>
    <date-pick
        v-model="dateFrom"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <label>Date To</label>
    <date-pick
        v-model="dateTo"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <h3>{{citySearch}}</h3>

    <Weather :place="citySearch"/>

    <WeatherDetails :place="citySearch" :dateFrom="dateFrom" :dateTo="dateTo" />

    <PostWeather :place="citySearch"/>
  </div>
</template>

<script>
import Weather from "@/components/Weather";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import WeatherDetails from "@/components/WeatherDetails";
import PostWeather from "@/components/PostWeather";

export default {
  name:  "App",
  components: {
    Weather,
    WeatherDetails,
    PostWeather,
    DatePick,

  },
  data() {
    return {
      citySearch: "",
      dateFrom: 'select from date',
      dateTo: 'select to date'
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
