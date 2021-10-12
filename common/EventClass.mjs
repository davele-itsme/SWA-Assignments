function EventClass(time, place) {
  //Renamed to EventClass so that it is not confused with Event
  const state = { time, place };
  Object.freeze(this);

  return {
    getTime() {
      return state.time;
    },
    getPlace() {
      return state.place;
    },
  };
}
Object.freeze(EventClass);

export { EventClass };
