function DateInterval(from, to) {
  const state = { from, to };

  return {
    getFrom() {
      return state.from;
    },
    getTo() {
      return state.to;
    },
    contains(d) {
      return d >= state.from && d <= state.to;
    },
  };
}

export default DateInterval;
