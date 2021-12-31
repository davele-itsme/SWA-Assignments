function Event(time, place) {
  const state = { time, place };

  return {
    getTime() {
      return state.time;
    },
    getPlace() {
      return state.place;
    },
  };
}

export default Event;
